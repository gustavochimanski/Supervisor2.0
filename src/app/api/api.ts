// lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://51.38.190.174:8087/v1/",
  withCredentials: false, // DESLIGA isso se estiver usando Authorization (e não cookie HttpOnly)
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
