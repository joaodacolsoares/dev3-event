import { PrismaClient } from '@prisma/client';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const handler = async (request, response) => {
  if (!['POST', 'GET'].includes(request.method)) {
    return response.status(METHOD_NOT_ALLOWED).json({ error: 'Only GET and POST requests are allowed' });
  }

  const cookies = new Cookies(request, response);
  const token = cookies.get('jwt');
  const { email } = jwt.decode(token);

  if (request.method === 'POST') {
    const updatedPage = await updatePage(email, JSON.parse(request.body));
    return response.status(201).json(updatedPage);
  }

  if (request.method === 'GET') {
    const page = await getPage(email);
    return response.status(201).json(page);
  }

  return response.status(201).json({ success: true });
};

const updatePage = async (email, data) => {
  const userInDatabase = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userInDatabase.route) {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        route: data.route,
      },
    });
  }

  const updatedPage = await prisma.customPage.upsert({
    where: {
      userId: userInDatabase.id,
    },
    update: {
      userId: userInDatabase.id,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      email: data.email,
      phone: data.phone,
    },
    create: {
      userId: userInDatabase.id,
      route: data.route,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      email: data.email,
      phone: data.phone,
    },
  });

  return updatedPage;
};

export default handler;
