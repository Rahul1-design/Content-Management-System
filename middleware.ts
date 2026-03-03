import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');

    //   if user is already login and tried to access the login page redirect him to the dashboard page
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/admin/dashbaord', req.url));
    }

    //   if user is not logged in and tried to access the dashboard page then redirect him to login page

    if (isAdminPage && !isAuth) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/admin/users') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
