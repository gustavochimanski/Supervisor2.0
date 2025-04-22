import { cookies } from "next/headers";
import ClientLayout from "@/components/security/ClientLayout";
import { auth } from "@/auth"; // ← verifica sessão
import { redirect } from "next/navigation"; // ← redireciona se não logado

import "./globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <html>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

