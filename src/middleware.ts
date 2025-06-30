import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define a chave secreta igual à usada para gerar o token (coloque no .env)
const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

// Define as rotas que precisam de autenticação
const PROTECTED_PATHS = ["/dashboard", "/admin", "/produtos", "/clientes"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isProtected = PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, secret); // valida assinatura e expiração
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/produtos/:path*", "/clientes/:path*"], // ou use: ["/((?!api|_next|.*\\..*).*)"]
};
