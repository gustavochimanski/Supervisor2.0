"use client";

import axios from "axios";

const apiMensura = axios.create({
  baseURL: "http://localhost:8000",
});


export default apiMensura;
