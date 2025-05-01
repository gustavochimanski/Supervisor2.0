import { auth } from "@/auth";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Rotas públicas e comportamento para usuários autenticados
const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/unitec", whenAuthenticated: "" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export default auth(async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  // 🚫 Ignora arquivos estáticos
  if (
    path.startsWith("/_next") ||
    path === "/favicon.ico" ||
    path === "/sitemap.xml" ||
    path === "/robots.txt" ||
    path.startsWith("/logoNome.jpg") ||
    path.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // 🧠 Busca token e verifica expiração
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isTokenExpired = token?.exp && token.exp * 1000 < Date.now();
  const isAuthenticated = !!token && !isTokenExpired;
  const publicRoute = publicRoutes.find((route) => route.path === path);

  // 🚨 Token expirado → redireciona e remove cookies
  if (token && isTokenExpired) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("next-auth.session-token", "", { expires: new Date(0), path: "/" });
    response.cookies.set("__Secure-next-auth.session-token", "", { expires: new Date(0), path: "/" });
    return response;
  }

  // 🔓 Rota pública → permite acesso sem token
  if (!token && publicRoute) {
    return NextResponse.next();
  }

  // ❌ Rota protegida e sem token → redireciona
  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    isAuthenticated &&
    publicRoute?.whenAuthenticated === "redirect" &&
    request.method === "GET"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }
  

  // ✅ Passa normal
  return NextResponse.next();
});

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/|favicon.ico|sitemap.xml|robots.txt|public).*)"],
};
