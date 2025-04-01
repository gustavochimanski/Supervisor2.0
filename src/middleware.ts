import { auth } from "@/auth";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Definição de rotas públicas
const publicRoutes = [
  { path: "/login", whenAutheticate: 'redirect' },
  { path: "/unitec", whenAutheticate: '' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE = '/login';

export default auth(async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  // Liberação geral de assets e arquivos públicos
  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon.ico') ||
    path.startsWith('/sitemap.xml') ||
    path.startsWith('/robots.txt') ||
    path.startsWith('/logoNome.jpg') || // qualquer asset da sua página de login
    path.startsWith('/public') // caso use pasta public para assets
  ) {
    return NextResponse.next();
  }

  // Match da rota pública exata
  const publicRoute = publicRoutes.find(route => route.path === path);

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Verifica se o token expirou
  if (token && token.exp && token.exp * 1000 < Date.now()) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // Permite rotas públicas sem token
  if (!token && publicRoute) {
    return NextResponse.next();
  }

  // Se não houver token e a rota não for pública, redireciona para login
  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // Se houver token e a rota pública for para redirecionar
  if (token && publicRoute?.whenAutheticate === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // Caso contrário, permite o acesso
  return NextResponse.next();
});

// Matcher atualizado para liberar qualquer asset
export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/|favicon.ico|sitemap.xml|robots.txt|logoNome.jpg|public).*)',
  ],
};
