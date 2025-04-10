import apiSSR from "@/app/api/apiSSR";
import { auth } from "@/auth";
import { TypeCaixas } from "../types/typesCaixas";

export const fetchAllCaixasSSR = async (): Promise<TypeCaixas[]> => {

  const session = await auth();
  const api = apiSSR(session?.accessToken ?? ""); // garante string, pode ser vazia

  try {
    const { data } = await api.get("/config/pdvs");
    return data;
  } catch (error) {
    throw new Error("Erro ao buscar caixas");
  }
};
