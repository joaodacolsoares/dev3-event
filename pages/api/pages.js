import { PrismaClient } from '@prisma/client';

const METHOD_NOT_ALLOWED = 405;

const prisma = new PrismaClient();

const logout = async (request, response) => {
  const pages = await prisma.customPage.findMany();
  if (request.method !== 'GET') {
    return response.status(METHOD_NOT_ALLOWED).json({ error: 'Only GET requests are allowed' });
  }

  return response.status(201).json(pages);
};

export default logout;
