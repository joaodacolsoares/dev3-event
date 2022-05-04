import { serialize } from 'cookie';

export const setCookie = (res, name, value) => {
  res.setHeader('Set-Cookie', serialize(name, value));
};
