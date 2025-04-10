// services/PerfisDeCaixaServiceSSR.ts
import apiSSR from "@/app/api/apiSSR";
import { auth } from "@/auth";
import { PerfilPdv } from "../types/typesPerfisDeCaixa";

export const fetchAllPerfisSSR = async (): Promise<PerfilPdv[]> => {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Token JWT ausente");
  }

  const api = apiSSR(session.accessToken);

  try {
    const { data } = await api.get("/config/perfilpdv");
    return data;
  } catch (error) {
    throw new Error("Erro ao buscar perfis de caixa");
  }
};
