// app/login/layout.tsx
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
        {children}
      </div>
    </div>
  );
}
