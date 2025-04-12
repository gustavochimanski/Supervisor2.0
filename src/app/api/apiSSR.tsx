// services/apiServer.ts
import axios, { AxiosInstance } from "axios";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

let cachedSession: any = null;

const apiSSR = async (): Promise<AxiosInstance> => {
  // Usa cache se já tiver
  if (!cachedSession) {
    cachedSession = await auth();
  }

  const token = cachedSession?.accessToken;

  // Se não tiver token, redireciona para login
  if (!token) {
    console.warn("🔒 Sessão ausente. Redirecionando para login...");
    redirect("/login");
  }
  

  const instance = axios.create({
    baseURL: "http://51.38.190.174:8087/v1/",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        console.warn("🔒 Token expirado no SSR. Limpando cache.");
        cachedSession = null; // limpa a sessão cacheada
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default apiSSR;
