// src/services/useQueryProduto.ts
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  TypeCadProdDeliveryResponse,
  TypeCriarNovoProduto,
} from "../types/cadProdDeliveryType";
import apiMensura from "@/app/api/apiMensura";

// === FETCH LISTAGEM DE PRODUTOS POR EMPRESA ===
export function useFetchCadProdDelivery(cod_empresa: number, page: number, limit = 30) {
  return useQuery<TypeCadProdDeliveryResponse>({
    queryKey: ["produtos", cod_empresa, page, limit],
    queryFn: async () => {
      const res = await apiMensura.get(
        `/mensura/produtos/delivery?cod_empresa=${cod_empresa}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });
}


export function useMutateProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await apiMensura.post("/mensura/produtos/delivery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("produtos");
    },
    onError: (error) => {
      console.error("❌ Erro ao criar produto:", error);
    },
  });
}