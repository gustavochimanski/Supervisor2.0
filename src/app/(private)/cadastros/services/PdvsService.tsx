// services/CaixasService.ts
import api from "@/app/api/api";
import { TypeCaixas } from "../types/typesPDVS";
import { ssrApiFetch } from "@/app/api/SSR/ssrApiFetch";

// ================================ CLIENT ==============================================
// ======================================================================================
export const fetchAllCaixas = async (): Promise<TypeCaixas[]> => {
  const response = await api.get("/v1/config/pdv");
  return response.data;
};

export const fetchByIdCaixas = async (id: string): Promise<TypeCaixas> => {
  const response = await api.get(`/v1/config/pdv/${id}`);
  return response.data;
};



// =================================== SSR ==============================================
// ======================================================================================
export const fetchAllCaixasSSR = async (): Promise<TypeCaixas[]> => {
  return ssrApiFetch(api => api.get("/v1/config/pdv").then(res => res.data));
};