import { useQuery } from "react-query";
import apiMensura from "@/app/api/apiMensura";
import { CategoryApi } from "../types/categoriasDeliveryType";


export function useCategorias() {
  return useQuery<CategoryApi[]>({
    queryKey: ["categorias_planas"],
    queryFn: async () => {
      const res = await apiMensura.get("/mensura/categorias/delivery");
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}
