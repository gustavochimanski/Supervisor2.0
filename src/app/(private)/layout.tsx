// src/app/(private)/layout.tsx
import ClientLayout from "@/components/security/ClientLayout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "./globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <html lang="pt-BR">
      {/* aqui é o pulo do gato */}
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
