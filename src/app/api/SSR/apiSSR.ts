// app/api/apiSSR.ts
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export async function getApiServer(): Promise<AxiosInstance> {
  // 1️⃣ aguarda o cookie store
  const cookieStore = await cookies();

  // 2️⃣ lê o token
  const token = cookieStore.get("token")?.value;

  // 3️⃣ monta headers
  const headers: Record<string,string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // 4️⃣ retorna instância já configurada
  return axios.create({
    baseURL: "http://51.38.190.174:8087",
    headers,
  });
}
