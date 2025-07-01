import apiMensura from "@/app/api/apiMensura";
import { TypeEmpresas } from "@/types/empresas/TypeEmpresas";

export const getEmpresas = async (
  ): Promise<TypeEmpresas[]> => {
    try {
      const { data } = await apiMensura.get("/pu/empresas",);

      return data;
    } catch (err: any) {
      if (err.response) {
        throw new Error(err.response.data.detail || "Erro na API");
      } else {
        throw new Error("Erro de rede ou API está fora");
      }
    }
  };
  