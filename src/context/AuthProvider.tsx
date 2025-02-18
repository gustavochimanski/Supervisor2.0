"use client";

import { createContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { login as loginService, logout as logoutService, LoginData } from "@/services/AuthService";
import CircularProgress from "@mui/material/CircularProgress";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
};

// Criando o contexto de autenticação
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthChecked, isAuthenticated } = useAuth();
  const [authState, setAuthState] = useState({ isAuthenticated: false });

  async function login(data: LoginData) {
    try {
      await loginService(data);
      setAuthState({ isAuthenticated: true });
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    }
  }

  function logout() {
    logoutService();
    setAuthState({ isAuthenticated: false });
  }

  useEffect(() => {
    if (isAuthChecked) {
      setAuthState({ isAuthenticated });
    }
  }, [isAuthChecked, isAuthenticated]);

  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: authState.isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
