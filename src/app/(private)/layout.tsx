// src/app/layout.tsx

import { cookies } from "next/headers";
import ClientLayout from "@/components/security/ClientLayout";
import AuthProvider from "@/context/AuthProvider";

import "./globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html>
      <body>
        <ClientLayout defaultOpen={defaultOpen}>
          {/* AuthProvider é um Client Component que faz o redirecionamento */}
          <AuthProvider>{children}</AuthProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
