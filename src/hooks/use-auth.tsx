import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.replace("/login"); // Usamos replace para evitar que o usuário volte
    } else {
      setIsAuthenticated(true);
    }

    setIsAuthChecked(true); // Agora sabemos que a verificação foi concluída
  }, [router]);

  return { isAuthChecked, isAuthenticated };
}
