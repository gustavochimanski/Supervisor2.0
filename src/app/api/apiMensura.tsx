"use client";

import axios from "axios";

const apiMensura = axios.create({
  baseURL: "http://mensuraapi.com.br",
});


export default apiMensura;
