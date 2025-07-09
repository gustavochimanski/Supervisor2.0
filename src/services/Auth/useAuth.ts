// src/hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { getCookie } from "cookies-next";
import { loginService } from "@/services/Auth/authenticate";

interface Credentials {
  username: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [typeUser, setTypeUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Quando recarrega, verifica se há token no cookie
  useEffect(() => {
    const token = getCookie("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(
    (creds: Credentials) => loginService(creds.username, creds.password),
    {
      onSuccess: (data) => {
        setTypeUser(data.type_user);
        setIsAuthenticated(true);
          setTimeout(() => {
            router.push("/");
          }, 100); // 100ms já resolve
      },
    }
  );

  return {
    login,
    isLoggingIn,
    typeUser,
    isAuthenticated,
  };
}
