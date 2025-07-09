// src/services/Auth/authenticate.ts

import axios from "axios";
import { setCookie } from "cookies-next"; // ✅ funciona no client e server


export type LoginResponse = {
  token_type: string;
  type_user: string;
  access_token: string
};

const api = axios.create({
  baseURL: "https://mensuraapi.com.br",       // proxy em next.config.js → VPS/mensura
});


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
    secure: process.env.NODE_ENV === "production",
  });

  return data;
}
