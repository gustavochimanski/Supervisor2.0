"use client";

import axios from "axios";

const apiMensura = axios.create({
  baseURL: "http://192.168.15.161:8000",
});


export default apiMensura;
