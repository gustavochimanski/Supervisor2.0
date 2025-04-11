// services/apiServer.ts
import axios from "axios";

const apiSSR = (token: string) => {
  const instance = axios.create({
    baseURL: "http://51.38.190.174:8087/v1/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          console.warn("[apiSSR] Token inválido (401).");
        } else {
          console.error(`[apiSSR] Erro ${status}:`, error.response.data);
        }
      } else {
        console.error("[apiSSR] Erro desconhecido:", error);
      }

      return Promise.reject(error); // <-- deixa o tratamento pro lado de fora
    }
  );

  return instance;
};

export default apiSSR;
