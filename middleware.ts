import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const loginPages = ['/login'];

  if (!token && loginPages.includes(req.nextUrl.pathname)) {
    // Jika tidak ada token dan mencoba mengakses halaman login, izinkan akses
    return NextResponse.next();
  }

  if (token && loginPages.includes(req.nextUrl.pathname)) {
    // Jika sudah login dan mencoba mengakses halaman login, redirect ke halaman dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    // Jika tidak ada token dan mencoba mengakses halaman yang dilindungi, redirect ke login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/myreport', '/login'],
};
