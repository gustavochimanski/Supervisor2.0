"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setChecking(false); // liberado para renderizar o conteúdo
    }
  }, [router]);

  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-muted-foreground">
        Verificando sessão...
      </div>
    );
  }

  return <>{children}</>;
}
