const logout = async (request, response) => {
  return response.status(201).setHeader('Set-Cookie', ['jwt=invalid;path=/;']).send('cookie cleared');
};

export default logout;
