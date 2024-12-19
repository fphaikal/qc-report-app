import { NextRequest, NextResponse } from 'next/server';
import { decodeToken } from './utils/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  let user = null;
  if (token) {
    try {
      user = decodeToken(token); // Dekode token untuk mendapatkan data user
    } catch (error: any) { // Remove the type annotation from the catch clause variable
      console.error('Invalid token:', error.message);
      // Token tidak valid, redirect ke login
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  const role = (user as { role?: string })?.role || 'user'; // Ambil role dari token, default ke 'user'
  // Jika role bukan admin dan mencoba mengakses NCR atau IPR
  if (role !== 'admin' && (url.pathname.startsWith('/dashboard/ncr') || url.pathname.startsWith('/dashboard/ipr')|| url.pathname.startsWith('/dashboard/admin')) ) {
    url.pathname = '/dashboard'; // Redirect ke halaman home untuk user biasa
    return NextResponse.redirect(url);
  }

  const loginPages = ['/login', '/'];

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

// Tentukan path mana saja yang ingin menggunakan middleware ini
export const config = {
  matcher: ['/dashboard', '/login', '/dashboard/ncr/:path*', '/dashboard/ipr/:path*', '/dashboard/ngData/:path*', '/dashboard/admin/:path*', '/announcement'],
};
