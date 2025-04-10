// services/CaixasService.ts
import api from "@/app/api/api";
import { TypeCaixas } from "../types/typesCaixas";
import { auth } from "@/auth";
import apiSSR from "@/app/api/apiSSR";

// ======================================================================================
// ================================ CLIENT ==============================================
// ======================================================================================
export const fetchAllCaixas = async (): Promise<TypeCaixas[]> => {
  const response = await api.get("config/pdvs");
  return response.data;
};

export const fetchByIdCaixas = async (id: string): Promise<TypeCaixas> => {
  const response = await api.get(`config/pdvs/${id}`);
  return response.data;
};



// ======================================================================================
// ================================== SSR ===============================================
// ======================================================================================

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
