import { useMutation, useQueryClient } from "react-query";
import { postHeaderDashboard } from "../services/serviceDashboard";
import { TypeDashboardHeader, TypeFiltroRelatorio } from "../types/typeCardHeader";

export const usePostDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation<TypeDashboardHeader, Error, TypeFiltroRelatorio>(
    (payload: TypeFiltroRelatorio) => postHeaderDashboard(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('postHeaderDashboard');
      },
      onError: (error: any) => {
        console.error("Erro ao buscar dados do header:", error);
      }
    }
  );
};