import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('auth')?.value; // Ambil role dari cookie, default 'user'
  const url = req.nextUrl.clone();

  // Jika role bukan admin dan mencoba mengakses NCR atau IPR
  if (role !== 'admin' && (url.pathname.startsWith('/dashboard/ncr') || url.pathname.startsWith('/dashboard/ipr'))) {
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
  matcher: ['/dashboard', '/login', '/dashboard/ncr/:path*', '/dashboard/ipr/:path*', '/dashboard/ngData/:path*', '/dashboard/admin/:path*'],
};
