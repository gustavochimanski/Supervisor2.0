// /services/apiServer.ts
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getApiSSR() {
  const cookieStore = cookies(); 
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const api = axios.create({
    baseURL: "http://51.38.190.174:8087/v1/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
}
