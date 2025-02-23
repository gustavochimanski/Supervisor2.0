// src/context/AuthProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  login as loginService,
  logout as logoutService,
  LoginData,
} from "@/services/security/AuthService";
import LoaderComponent from "@/components/ui/loader";


interface AuthContextType {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica a autenticação na montagem (por exemplo, lendo o token do localStorage)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwt");
      if (token) {
        setIsAuthenticated(true);
      }
      setIsAuthChecked(true);
    }
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      // Supondo que o loginService retorne o token
      const token = await loginService(data);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error("Erro ao autenticar:", err);
      throw err;
    }
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthChecked, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
}
