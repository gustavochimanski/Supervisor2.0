// src/lib/api.ts
"use client"; // Se estiver usando Next.js App Router no front

import axios from "axios";

// Cria uma instância com URL base
const api = axios.create({
  baseURL: "http://localhost:8080", // Ajuste conforme sua API
});

// Interceptor para inserir o token em cada requisição
api.interceptors.request.use(
  (config) => {
    // Obter o token do localStorage (ou sessionStorage)
    const token = localStorage.getItem("jwt");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Se der erro ao configurar a request
    return Promise.reject(error);
  }
);

export default api;
