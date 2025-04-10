import { redirect } from "next/navigation";

export async function authRedirectSSR<T>(fn: () => Promise<T>, redirectTo = "/login"): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    console.error("[authRedirectSSR] Redirecionando por erro de autenticação:", err);
    redirect(redirectTo);
  }
}
