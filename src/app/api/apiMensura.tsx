"use client";

import axios from "axios";

const apiMensura = axios.create({
  baseURL: "http://69.62.93.161:1000/",
});


export default apiMensura;
