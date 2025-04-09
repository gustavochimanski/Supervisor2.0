import { authorizedFetch } from "@/utils/authorizedFetch";
import { TypeCaixas } from "../types/typesCaixas";

export const fetchAllCaixasSSR = async (): Promise<TypeCaixas[]> => {
  const res = await authorizedFetch("http://51.38.190.174:8087/v1/config/pdvs");
  console.log("[SSR] Buscando caixas via SSR...");

  if (!res.ok) {
    throw new Error("Erro ao buscar caixas");
  }

  return res.json();
};
