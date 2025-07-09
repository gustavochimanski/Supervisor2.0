import apiMensura from "@/lib/api/apiMensura";
import { TypeEmpresas } from "@/types/empresas/TypeEmpresas";


export async function fetchEmpresasDetalhes(): Promise<TypeEmpresas[]> {
    try {
      const { data } = await apiMensura.get("/public/empresas/detalhes");

      return data;
    } catch (err: any) {
      if (err.response) {
        throw new Error(err.response.data.detail || "Erro na API");
      } else {
        throw new Error("Erro de rede ou API está fora");
      }
    }
}
  