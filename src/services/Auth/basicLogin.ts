// services/Auth/basicLogin.ts
import axios from "axios";

export async function basicLogin(username: string, password: string) {
  const tokenBase64 = btoa(`${username}:${password}`); // codifica no formato base64

  const response = await axios.post(
    "http://51.38.190.174:8087/v1/auth/token",
    {},
    {
      headers: {
        Authorization: `Basic ${tokenBase64}`,
      },
    }
  );

  return response.data;
}
