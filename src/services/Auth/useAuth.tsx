// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { jwtDecode } from "jwt-decode";
import { loginService, logoutService } from "./authenticate";

type JwtPayload = {
  sub: string;
  name?: string;
  exp: number;
  [key: string]: any;
};

export function useAuth() {
  // Inicializa user a partir do token, se houver
  const [user, setUser] = useState<JwtPayload | null>(() => {
    const token = Cookies.get("token");
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  });

  // Login → salva cookie e decodifica
  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(
    ({ username, password }: { username: string; password: string }) =>
      loginService(username, password),
    {
      onSuccess: (token) => {
        try {
          setUser(jwtDecode<JwtPayload>(token));
        } catch {
          setUser(null);
        }
      },
    }
  );

  // Logout → limpa cookie e estado
  const logout = () => {
    logoutService();
    setUser(null);
  };

  // Auto-logout no expirar do token
  useEffect(() => {
    if (!user) return;
    const ttl = user.exp * 1000 - Date.now();
    if (ttl <= 0) {
      logout();
      return;
    }
    const timer = setTimeout(logout, ttl);
    return () => clearTimeout(timer);
  }, [user]);

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoggingIn,
  };
}
