// services/CaixasService.ts
import api from "@/app/api/api";
import { TypeCaixas } from "../types/typesPDVS";
import { ssrApiFetch } from "@/lib/ssrApiFetch";

// ================================ CLIENT ==============================================
// ======================================================================================
export const fetchAllCaixas = async (): Promise<TypeCaixas[]> => {
  const response = await api.get("config/pdv");
  return response.data;
};

export const fetchByIdCaixas = async (id: string): Promise<TypeCaixas> => {
  const response = await api.get(`config/pdv/${id}`);
  return response.data;
};



// =================================== SSR ==============================================
// ======================================================================================
export const fetchAllCaixasSSR = async (): Promise<TypeCaixas[]> => {
  return ssrApiFetch(api => api.get("config/pdv").then(res => res.data));
};