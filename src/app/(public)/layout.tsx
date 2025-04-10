// src/app/login/layout.tsx

import { Toaster } from "@/components/ui/toastes";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Toaster className=""/>
      </body>
    </html>
  );
}
