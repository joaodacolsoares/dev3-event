import { NextResponse } from 'next/server';

export async function middleware(req) {
  if (typeof req.page.name === 'string' && !req.page.name.startsWith('/api')) {
    try {
      const jwt = require('@tsndr/cloudflare-worker-jwt');
      await jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);

      return NextResponse.next();
    } catch (e) {
      const url = req.nextUrl.clone();
      url.pathname = `/login`;
      const res = NextResponse.redirect(url);
      return res;
    }
  }

  return NextResponse.next();
}
