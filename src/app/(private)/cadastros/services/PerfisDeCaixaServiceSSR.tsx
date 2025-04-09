// services/PerfisDeCaixaServiceSSR.ts
import { authorizedFetch } from "@/utils/authorizedFetch";
import { PerfilPdv } from "../types/typesPerfisDeCaixa";

export const fetchAllPerfisSSR = async (): Promise<PerfilPdv[]> => {
  const res = await authorizedFetch("http://51.38.190.174:8087/v1/config/perfilpdv");

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro ao buscar perfis de caixa:", res.status, errorText);
    throw new Error("Erro ao buscar perfis de caixa");
  }

  return res.json();
};
