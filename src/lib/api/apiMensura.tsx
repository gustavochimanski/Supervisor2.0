// api.ts

import axios from "axios";

const apiMensura = axios.create({
  baseURL: "https://mensuraapi.com.br",
});

apiMensura.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiMensura;
