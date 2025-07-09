// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // rotas públicas
  if (
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\..+$/)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    // redireciona de verdade para /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { exp } = decodeJwt(token);
    if (!exp || Date.now() >= exp * 1000) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login|.*\\..*).*)"],
};
