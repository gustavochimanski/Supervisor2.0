"use client"; // Se estiver usando Next.js App Router no front

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Ajuste conforme sua API
});

// Interceptor para inserir o token em cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para capturar erros 401 e redirecionar
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("jwt"); // Remove o token inválido
      window.location.href = "/login"; // Redireciona para a tela de login
    }
    return Promise.reject(error);
  }
);

export default api;
