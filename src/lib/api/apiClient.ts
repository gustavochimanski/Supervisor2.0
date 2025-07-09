"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "https://mensuraapi.com.br",       // proxy em next.config.js → VPS/mensura
});


export default api;