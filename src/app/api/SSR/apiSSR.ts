import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export async function getApiServer(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const baseURL = process.env.NEXT_PUBLIC_API_BASE; // ✅ Use URL real

  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_BASE não definido no .env");
  }

  return axios.create({
    baseURL, // ✅ agora funciona no server
    headers,
  });
}
