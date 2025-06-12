// /services/apiServer.ts
import axios from "axios";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getApiSSR() {
  const session = await auth();

  if (!session?.accessToken) {
    // Redireciona ANTES de criar o axios ou fazer requests
    redirect("/login");
  }

  const api = axios.create({
    baseURL: "http://51.38.190.174:8087/v1/",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return api;
}
