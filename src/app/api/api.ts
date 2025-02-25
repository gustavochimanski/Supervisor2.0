"use client";

import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  // Aponte para o proxy do Next.js, não para o servidor real.
  baseURL: "/api/proxy",
  withCredentials: true, // Envia automaticamente os cookies
});

// Interceptor de request com inclusão do JWT
api.interceptors.request.use(
  async (config) => {
    // Obtém a sessão atual do NextAuth
    const session = await getSession();
    if (session?.accessToken) {
      // Adiciona o JWT no header Authorization
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export default api;
