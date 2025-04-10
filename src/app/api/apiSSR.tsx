// services/apiServer.ts
import axios from "axios";

const apiSSR = (token: string) => {
  const instance = axios.create({
    baseURL: "http://51.38.190.174:8087/v1/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Interceptor de resposta para tratar erros comuns (como 401)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          console.error("[SSR] Erro 401 - Token inválido ou expirado.");
          throw new Error("Sessão expirada ou inválida. Faça login novamente.");
        }

        console.error(`[SSR] Erro ${status} ao fazer requisição:`, error.response.data);
      } else {
        console.error("[SSR] Erro desconhecido ao fazer requisição:", error);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default apiSSR;
