"use client";

import axios from "axios";

const apiMensura = axios.create({
  baseURL: "https://mensuraapi.com.br",
});


export default apiMensura;
