import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { setCookie } from '../../helpers/SetCookie';

const prisma = new PrismaClient();

const METHOD_NOT_ALLOWED = 405;
const DUPLICATED_USER = 'duplicated';

const handleError = {};
handleError[DUPLICATED_USER] = { statusCode: 409, message: 'User already exists' };

const handler = async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(METHOD_NOT_ALLOWED).json({ error: 'Only POST requests are allowed' });
  }

  const { name, email, password } = request.body;

  if (!(email && password)) {
    return response.status(400).json({ error: 'Invalid request parameters.' });
  }

  try {
    const token = await register(name, email, password);
    setCookie(response, 'jwt', token);
    return response.status(201).end();
  } catch (err) {
    const { statusCode, message } = handleError[err.name];
    return response.status(statusCode).json(message);
  }
};

const register = async (name, email, password) => {
  const userInDatabase = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userInDatabase) {
    const error = new Error();
    error.name = DUPLICATED_USER;
    throw error;
  }

  const hashedPassword = crypto.createHmac('sha256', process.env.PASSWORD_HASHING_KEY).update(password).digest('hex');

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  return jwt.sign({ name: name, email: email }, process.env.SECRET_KEY, { expiresIn: 300 });
};

export default handler;
