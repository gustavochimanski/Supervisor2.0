// middleware.ts
import { NextRequest, NextResponse } from "next/server";

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
    // sem cookie, manda pro login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // se tiver cookie (mesmo expirado), deixa passar:
  // o backend FastAPI é que vai retornar 401 quando expirar ou for inválido
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login|.*\\..*).*)"],
};
