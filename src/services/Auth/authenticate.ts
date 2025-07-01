// src/services/Auth/authenticate.ts

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// 🔑 Instância Axios só para login/logout (sem interceptor de request)
const authApi = axios.create({
  baseURL: "http://51.38.190.174:8087",
});

// 1️⃣ — Interceptor de resposta: trata 401 durante o processo de login (caso o refresh também quebre)
authApi.interceptors.response.use(
  res => res,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // limpa cookies e força redirecionamento para /login
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// 🚀 Função de login: usa authApi sem tentar injetar token lá na request
export async function loginService(username: string, password: string): Promise<string> {
  const body = new URLSearchParams({ username, password });
  const { data } = await authApi.post("/auth/token", body);

  if (!data.token) throw new Error("Token ausente");
  Cookies.set("token", data.token, { path: "/", expires: 7 });
  return data.token;   // string pura
}

export function logoutService() {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  window.location.href = "/login";
}
