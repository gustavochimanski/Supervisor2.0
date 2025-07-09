// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`[Middleware] Caminho acessado: ${pathname}`);

  // Ignorar caminhos públicos
  const publicPaths = ["/login", "/_next", "/api", "/favicon.ico"];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path)) || pathname.match(/\..+$/);

  if (isPublic) {
    console.log("[Middleware] Rota pública, acesso liberado.");
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    console.warn("[Middleware] Cookie 'access_token' ausente. Redirecionando para /login.");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log("[Middleware] Token presente no cookie. Acesso autorizado.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login|.*\\..*).*)"],
};
