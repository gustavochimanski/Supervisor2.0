"use client";

import { logout } from "@/services/Auth/authenticate";
import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "http://51.38.190.174:8087/v1/",
  withCredentials: true, // Envia automaticamente os cookies
});

let cachedSession: any = null;

// Interceptor de request com inclusão do JWT
api.interceptors.request.use(
  async (config) => {
    // Usa cache se já tiver
    if (!cachedSession) {
      cachedSession = await getSession();
    }

    if (cachedSession?.accessToken) {
      config.headers.Authorization = `Bearer ${cachedSession.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Limpa o cache ao perder a sessão
      cachedSession = null;

      logout();
      console.error("Não autorizado: 401", error);
    }
    return Promise.reject(error);
  }
);

export default api;
