// src/services/serviceDashboard.ts
import axios from "axios";
import { TypeDashboardHeader, TypeFiltroRelatorio } from "../types/typeDashboard";

export const postHeaderDashboard = async (
  payload: TypeFiltroRelatorio
): Promise<TypeDashboardHeader> => {
  try {
    const { data } = await axios.post<TypeDashboardHeader>(
      " http://192.168.15.161:8000/dashboard/periodo",
      payload
    );
    return data;
  } catch (err: any) {
    if (err.response) {
      console.error("Erro na resposta da API:", err.response.status, err.response.data);
    } else {
      console.error("Erro de rede ou timeout:", err.message);
    }
    throw new Error("Não foi possível carregar o header do dashboard");
  }
};
