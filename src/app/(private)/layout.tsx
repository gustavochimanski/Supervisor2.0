// src/app/(private)/layout.tsx
import "./globals.css";
import ClientLayout from "@/components/security/ClientLayout";
import ProtectedRoute from "@/components/security/ProtectedRoute";

export const metadata = {
  title: "Unitec",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    title: "Unitec",
    statusBarStyle: "black-translucent",
  },
};

export function generateViewport() {
  return {
    themeColor: "#000000",
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <ProtectedRoute>
          <ClientLayout>{children}</ClientLayout>
        </ProtectedRoute>
      </body>
    </html>
  );
}
