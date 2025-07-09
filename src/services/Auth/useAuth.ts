// src/hooks/useAuth.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { loginService } from "@/services/Auth/authenticate";

interface Credentials { username: string; password: string; }

export function useAuth() {
  const router = useRouter();
  const [typeUser, setTypeUser] = useState<string | null>(null);

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(
    (creds: Credentials) =>
      loginService(creds.username, creds.password),
    {
      onSuccess: (data) => {
        setTypeUser(data.type_user);
        router.push("/");
      },
    }
  );

  return {
    login,
    isLoggingIn,
    typeUser,
    isAuthenticated: !!typeUser,
  };
}
