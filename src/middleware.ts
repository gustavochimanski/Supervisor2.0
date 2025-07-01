// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

// Regex para arquivos estáticos
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  // Rotas públicas
  if (
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decodifica sem verificar assinatura
    const payload = decodeJwt(token);
    const exp = payload.exp;
    if (typeof exp !== "number" || Date.now() >= exp * 1000) {
      // token vencido
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // token válido (pelo menos não expirou)
    return NextResponse.next();
  } catch (err) {
    // token mal-formado
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|api|login|.*\\..*).*)"],
};
