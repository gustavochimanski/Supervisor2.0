import axios from "axios";

export type LoginData = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginData) {
  try {
    const response = await axios.post("http://localhost:8080/auth/token", { 
      username, 
      password 
    });

    const result = response.data;
    localStorage.setItem("jwt", result.token);
    return result;
  } catch (error: any) {
    console.error("Erro no login:", error);

    // Trata a resposta da API para capturar mensagens de erro
    const errorMessage = error.response?.data?.message || "Erro ao autenticar";
    throw new Error(errorMessage);
  }
}

export function logout() {
  localStorage.removeItem("jwt");
}
