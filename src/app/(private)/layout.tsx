// src/app/(private)/layout.tsx
import "./globals.css";
import ClientLayout from "@/components/security/ClientLayout";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export const metadata = {
  title: "Unitec",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Unitec",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: "/icon-192x192.png"
  }
};

export function generateViewport() {
  return {
    themeColor: "#000000",
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover"
  };
}


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <Head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <body suppressHydrationWarning>
        <SessionProvider>
          <ProtectedRoute>
            <ClientLayout>{children}</ClientLayout>
          </ProtectedRoute>
        </SessionProvider>
      </body>
    </html>
  );
}
