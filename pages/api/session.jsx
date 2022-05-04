import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const METHOD_NOT_ALLOWED = 405;

const INVALID_CREDENTIALS = 'invalidcredentials';

const errorResponse = {};
errorResponse[INVALID_CREDENTIALS] = { statusCode: 401, message: 'Invalid credentials' };

const handler = async (request, response) => {
  if (request.method !== 'GET') {
    return response.status(METHOD_NOT_ALLOWED).json({ error: 'Only GET requests are allowed' });
  }

  const token = request.cookies.jwt;

  if (token) {
    const user = await session(token);
    if (user) {
      return response.status(200).json(user);
    }
  }

  const { statusCode, message } = errorResponse[INVALID_CREDENTIALS];
  return response.status(statusCode).json({ error: message });
};

const session = async token => {
  try {
    jwt.verify(token, process.env.SECRET_KEY, { maxAge: 300 });
  } catch {
    return null;
  }

  const { email } = jwt.decode(token);
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
    },
    where: {
      email: email,
    },
  });
  return user;
};

export default handler;
