import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

const prisma = new PrismaClient();

const METHOD_NOT_ALLOWED = 405;

const INVALID_CREDENTIALS = 'invalidcredentials';

const errorResponse = {};
errorResponse[INVALID_CREDENTIALS] = { statusCode: 401, message: 'Invalid credentials' };

const handler = async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(METHOD_NOT_ALLOWED).send('Only POST requests are allowed');
  }

  const { email, password } = JSON.parse(request.body);

  const token = await login(email, password);

  if (token) {
    const cookies = new Cookies(request, response);
    cookies.set('jwt', token);
    return response.status(200).json({ success: true });
  }

  const { statusCode, message } = errorResponse[INVALID_CREDENTIALS];
  return response.status(statusCode).json({ error: message });
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    const { statusCode, message } = errorResponse[INVALID_CREDENTIALS];
    return response.status(statusCode).json({ error: message });
  }

  const hashedPassword = crypto.createHmac('sha256', process.env.PASSWORD_HASHING_KEY).update(password).digest('hex');

  if (hashedPassword === user.password) {
    return jwt.sign({ name: user.name, email: user.email }, process.env.SECRET_KEY);
  }
  return null;
};

export default handler;
