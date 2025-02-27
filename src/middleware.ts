import { auth } from "@/auth";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = [
  { path: "/login", whenAutheticate: 'redirect' },
  { path: "/unitec", whenAutheticate: '' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE = '/login';

export default auth(async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find(route => route.path === path);
  
  // Obtém o token da sessão usando o NextAuth.
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Verifica se o token está expirado (caso o JWT contenha a claim "exp")
  if (token && token.exp && token.exp * 1000 < Date.now()) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // Se não houver token e a rota for pública, permite o acesso
  if (!token && publicRoute) {
    return NextResponse.next();
  }

  // Se não houver token e a rota não for pública, redireciona para login
  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // Se houver token e a rota for pública com comportamento "redirect", redireciona para a home
  if (token && publicRoute && publicRoute.whenAutheticate === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // Caso contrário, permite o acesso
  return NextResponse.next();
});

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|public|unitec|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
