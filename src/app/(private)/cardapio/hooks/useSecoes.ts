import { useQuery, useMutation, useQueryClient } from "react-query";
import { CreateSecaoDTO, SecaoDelivery } from "../types/subCategSecoesType";
import apiMensura from "@/app/api/apiMensura";

// ✅ GET
export function useSubcategorias(empresaId: number, codCategoria?: number) {
  return useQuery({
    queryKey: ["subcategorias", empresaId, codCategoria],
    queryFn: async () => {
      const { data } = await apiMensura.get<SecaoDelivery[]>("/mensura/subcategorias/delivery", {
        params: {
          empresa_id: empresaId,
          ...(codCategoria ? { cod_categoria: codCategoria } : {}),
        },
      });
      return data;
    },
    enabled: !!empresaId, 
  });
}

// ✅ POST
export const useCreateSubcategoria = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateSecaoDTO, Error, Omit<CreateSecaoDTO, "id">>({
    mutationFn: async (body) => {
      const { data } = await apiMensura.post("/mensura/subcategorias/delivery", body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategorias"] });
    },
  });
};

// ✅ DELETE
export const useDeleteSubcategoria = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (sub_id) => {
      await apiMensura.delete(`/mensura/subcategorias/delivery/${sub_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategorias"] });
    },
  });
};
