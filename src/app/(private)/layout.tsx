import { cookies } from "next/headers";
import ClientLayout from "@/components/security/ClientLayout";
import { auth } from "@/auth"; // ← verifica sessão
import { redirect } from "next/navigation"; // ← redireciona se não logado

import "./globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth(); // ← Aqui você verifica o login

  if (!session) {
    redirect("/login"); // ← Redireciona se não autenticado
  }

  const cookieStore = cookies();
  const defaultOpen = (await cookieStore).get("sidebar:state")?.value === "true";

  return (
    <html>
      <body>
        <ClientLayout defaultOpen={defaultOpen}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
