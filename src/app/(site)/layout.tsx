// src/app/layout.tsx

import { cookies } from "next/headers";
import ClientLayout from "@/components/ClientLayout";
import AuthGuard from "@/components/AuthGuard";
import "./globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html>
      <body>
        <ClientLayout defaultOpen={defaultOpen}>
          {/* AuthGuard é um Client Component que faz o redirecionamento */}
          <AuthGuard>{children}</AuthGuard>
        </ClientLayout>
      </body>
    </html>
  );
}
