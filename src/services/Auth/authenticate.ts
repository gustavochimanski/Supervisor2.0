// src/services/Auth/authenticate.ts

import api from "@/lib/api/apiClient";
import { setCookie } from "cookies-next"; // ✅ funciona no client e server


export type LoginResponse = {
  token_type: string;
  type_user: string;
  access_token: string
};


export async function loginService(
  username: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/mensura/auth/token",
    { username, password }
  );

  // 🔐 Armazena em cookie para acesso universal (SSR + client)
  setCookie("access_token", data.access_token, {
    path: "/",            // acessível em todas as rotas
    maxAge: 60 * 30,      // 30 minutos
    sameSite: "lax",
    secure: true,
  });

  return data;
}
