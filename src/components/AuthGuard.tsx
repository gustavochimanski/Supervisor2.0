"use client"; // Este componente é executado no cliente

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      // Se não houver token, redireciona para a página de login
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
