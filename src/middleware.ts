import { auth } from "@/auth";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = [
  { path: "/login", whenAutheticate: "redirect" },
  { path: "/unitec", whenAutheticate: "" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE = "/login";

export default auth(async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  // Liberação geral de assets e arquivos públicos
  if (
    path.startsWith("/_next") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/sitemap.xml") ||
    path.startsWith("/robots.txt") ||
    path.startsWith("/logoNome.jpg") ||
    path.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  const publicRoute = publicRoutes.find((route) => route.path === path);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isTokenExpired = token?.exp && token.exp * 1000 < Date.now();
  const isAuthenticated = token && !isTokenExpired;

  // 🔒 Token expirado? Redireciona para login
  if (token && isTokenExpired) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Se rota for pública e não tiver token, permite
  if (!token && publicRoute) {
    return NextResponse.next();
  }

  // ❌ Se não tiver token e a rota for protegida, redireciona
  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATE_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // 🛑 Usuário autenticado tentando acessar rota como /login? Redireciona pra "/"
  if (isAuthenticated && publicRoute?.whenAutheticate === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/|favicon.ico|sitemap.xml|robots.txt|public).*)",
  ],
};
