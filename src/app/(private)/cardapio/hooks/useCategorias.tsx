import { useQuery } from "react-query";
import { buildCategoryTree, CategoryNode } from "../components/categorias/buildCategoryTree";
import apiMensura from "@/app/api/apiMensura";

export function useCategorias() {
  return useQuery<CategoryNode[]>({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await apiMensura.get("/mensura/categorias/delivery");
      return buildCategoryTree(response.data); // 👈 Aqui acessamos só o data
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}
