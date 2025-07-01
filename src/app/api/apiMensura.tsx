"use client";

import axios from "axios";

const apiMensura = axios.create({
  baseURL: "/api/mensura",
});


export default apiMensura;
