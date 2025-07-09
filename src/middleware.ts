import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const ignoredPaths = [
    "/favicon.ico",
    "/robots.txt",
    "/.well-known",
  ];

  if (ignoredPaths.some((p) => pathname.startsWith(p))) {
    console.log(`[Middleware] Ignorado: ${pathname}`);
    return NextResponse.next();
  }

  console.log("[Middleware] Caminho acessado:", pathname);

  if (
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\..+$/)
  ) {
    console.log("[Middleware] Rota pública, acesso liberado.");
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    console.warn("[Middleware] Nenhum token. Redirecionando para /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { exp } = decodeJwt(token);
    if (!exp || Date.now() >= exp * 1000) {
      console.warn("[Middleware] Token expirado/inválido. Redirecionando.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("[Middleware] Token válido. Acesso OK.");
  } catch (err) {
    console.error("[Middleware] Erro ao decodificar token:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login|.*\\..*).*)"],
};
