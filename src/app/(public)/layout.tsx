// src/app/login/layout.tsx

import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/providers/QueryClientProvider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="overflow-hidden">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
