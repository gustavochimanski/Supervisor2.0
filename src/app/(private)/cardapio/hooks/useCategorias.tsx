import { useQuery } from "react-query";
import { buildCategoryTree} from "../components/categorias/oldTree/buildCategoryTree";
import apiMensura from "@/app/api/apiMensura";
import { CategoryApi, CategoryNode } from "../types/categoriasDeliveryType";

export function useCategoriasTreeOld() {
  return useQuery<CategoryNode[]>({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await apiMensura.get("/mensura/categorias/delivery");
      return buildCategoryTree(response.data); // 👈 Aqui acessamos só o data
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

export function useCategorias() {
  return useQuery<CategoryApi[]>({
    queryKey: ["categorias_planas"],
    queryFn: async () => {
      const res = await apiMensura.get("/mensura/categorias/delivery");
      return res.data; // mantém estrutura original com slug_pai
    },
    staleTime: 10 * 60 * 1000,
  });
}
