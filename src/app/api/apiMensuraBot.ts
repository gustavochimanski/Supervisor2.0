// apiMensuraBot.ts

import axios from "axios";

const apiMensuraBot = axios.create({
  baseURL: "/api/mensura", // ponto central das chamadas da API no backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

export default apiMensuraBot;
