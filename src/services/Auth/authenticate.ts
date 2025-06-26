// src/services/Auth/authenticate.ts
import axios from "axios";

export async function loginService(username: string, password: string) {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  const basicAuth = btoa(`${username}:${password}`);

  try {
    const response = await axios.post(
      "http://51.38.190.174:8087/auth/token",
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    const { token } = response.data;

    if (!token) {
      throw new Error("Token não retornado pela API");
    }

    // Armazena o token (pode ser localStorage ou cookie seguro com js-cookie)
    localStorage.setItem("token", token);

    // 👇 Redireciona direto aqui
    window.location.href = "/";

    return response.data;
  } catch (err: any) {
    console.error("Erro no loginService:", err.response?.data || err.message);
    throw new Error("Credenciais inválidas");
  }
}
