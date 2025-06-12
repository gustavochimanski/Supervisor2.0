// src/services/serviceDashboard.ts
import axios from "axios";
import { TypeDashboardResponse, TypeFiltroDashboard } from "../types/typeDashboard";

export const postHeaderDashboard = async (
  payload: TypeFiltroDashboard
): Promise<TypeDashboardResponse> => {
  try {
    const { data } = await axios.post<TypeDashboardResponse>(
      " http://localhost:8000/dashboard/periodo",
      payload
    );
    return data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.detail || "Erro na API");
    } else {
      throw new Error("Erro de rede ou API está fora");
    }
  }
};
