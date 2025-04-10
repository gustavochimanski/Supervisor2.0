// services/CaixasServiceSSR.ts
import apiSSR from "@/app/api/apiSSR";// ou ajuste o caminho conforme sua estrutura
import { auth } from "@/auth";
import { TypeCaixas } from "../types/typesCaixas";

export const fetchAllCaixasSSR = async (): Promise<TypeCaixas[]> => {
  console.log("[SSR] Buscando caixas via SSR...");

  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Token JWT ausente");
  }

  const api = apiSSR(session.accessToken);

  try {
    const { data } = await api.get("/config/pdvs");
    return data;
  } catch (error) {
    console.error("Erro ao buscar caixas (SSR):", error);
    throw new Error("Erro ao buscar caixas");
  }
};
