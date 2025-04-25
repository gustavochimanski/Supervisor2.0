// services/CaixasService.ts
import api from "@/app/api/api";
import { TypeCaixas } from "../types/typesPDVS";
import apiSSR from "@/app/api/apiSSR";

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
export const fetchAllCaixasSSR = async () => {
  const api = await apiSSR(); // token já incluso
  const response = await api.get("config/pdv");
  return response.data;
};