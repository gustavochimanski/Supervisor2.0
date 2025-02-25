// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Só atua na rota /login
  if (pathname.startsWith("/login")) {
    // Tenta obter o token da sessão
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // Se o token existir, significa que o usuário está autenticado
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};
