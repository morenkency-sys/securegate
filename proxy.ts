import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!token.emailVerified) {
      return NextResponse.redirect(new URL("/verify-email", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/forgot-password", "/reset-password"],
};
