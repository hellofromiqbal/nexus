import { NextResponse } from 'next/server';
 
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/' || path === '/register';

  const token = request.cookies.get('nexus')?.value || '';

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  };

  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  };
};
 
export const config = {
  matcher: [
    '/',
    '/register',
    '/dashboard/:path*'
  ],
};