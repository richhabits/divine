import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin-only routes
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedAdmin", req.url));
    }

    // DJ portal routes (Both DJ and ADMIN roles are permitted)
    if (pathname.startsWith("/dj") && token?.role !== "DJ" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login?error=UnauthorizedDJ", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/dj/:path*",
  ],
};
