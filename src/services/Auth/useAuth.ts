// src/hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getCookie } from "cookies-next";
import { loginService } from "@/services/Auth/authenticate";

interface Credentials { username: string; password: string; }

export function useAuth() {
  const [typeUser, setTypeUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false); //  ← novo!

  // 1) checa cookie só uma vez
  useEffect(() => {
    const token = getCookie("access_token");
    setIsAuthenticated(!!token);
    setChecked(true);  // sinaliza que a checagem acabou
  }, []);

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(
    (creds: Credentials) => loginService(creds.username, creds.password),
    {
      onSuccess: (data) => {
        setTypeUser(data.type_user);
        // full reload para garantir middleware
        window.location.href = "/";
      },
    }
  );

  return {
    login,
    isLoggingIn,
    typeUser,
    isAuthenticated,
    checked,   // expose para o componente
  };
}
