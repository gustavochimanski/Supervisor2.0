// src/app/login/layout.tsx

import { Toaster } from "@/components/ui/toaster";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="overflow-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
