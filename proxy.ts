// proxy.ts
import { NextResponse, NextRequest } from "next/server";
import { verifyJWT } from "./lib/jwt";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("locallens_token")?.value;
  const { pathname } = request.nextUrl;

  // Public routes (landing, signin, signup)
  const isPublic = pathname === "/" || pathname.startsWith("/signin") || pathname.startsWith("/signup");

  if (!token && !isPublic) {
    // Not logged in and trying to access protected => redirect to signin
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && isPublic) {
    // Already logged in and trying to access public page => redirect to home
    try {
      verifyJWT(token);
      return NextResponse.redirect(new URL("/home", request.url));
    } catch {
      // invalid token => continue to public
      return NextResponse.next();
    }
  }

  // Else: either logged in accessing protected, or public accessing public => allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/home/:path*"],
};
