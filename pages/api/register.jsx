import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();

const DUPLICATED_USER = 'duplicated';

const handleError = {
  duplicated: { statusCode: 409, message: 'User already exists' },
};

const handler = async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(METHOD_NOT_ALLOWED).json({ error: 'Only POST requests are allowed' });
  }

  const { name, email, password } = request.body;
  if (!(email && password)) {
    return response.status(400).json({ error: 'Invalid request parameters.' });
  }

  try {
    const user = await register(name, email, password);
    return response.status(201).json(user);
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

  const token = jwt.sign({ email: email, name: name }, process.env.SECRET_KEY, { expiresIn: 300 });

  return { name: user.name, email: user.email, token: token };
};

export default handler;
