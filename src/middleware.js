import { NextResponse } from 'next/server';

export function middleware(request) {
  // Always set language to Chinese (zh) for this version
  const response = NextResponse.next();
  response.cookies.set('language', 'zh', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30일
  });
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}