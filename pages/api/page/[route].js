function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(METHOD_NOT_ALLOWED).json({ error: 'Only GET requests are allowed' });
  }

  const { route } = request.query;
  const page = getPage(route);
  response.status(201).json(page);
}

const getPage = async route => {
  const page = await prisma.customPage.findUnique({
    where: {
      route: route,
    },
  });

  return page;
};
