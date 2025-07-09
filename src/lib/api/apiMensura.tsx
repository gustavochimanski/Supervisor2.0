"use client";

import axios, { AxiosError } from "axios";

const apiMensura = axios.create({
  baseURL: "https://mensuraapi.com.br",
});

// apiMensura.interceptors.response.use(
//   res => res,
//   (err: AxiosError) => {
//     if (err.response?.status === 401) {
//       // se quiser, redirecione pra /login
//       window.location.href = "/login";
//     }
//     return Promise.reject(err);
//   }
// );

export default apiMensura;