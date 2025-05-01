// hooks/useDashboard.ts
import { useMutation, useQueryClient } from "react-query";
import { postHeaderDashboard } from "../services/serviceDashboard";
import { TypeDashboardResponse, TypeFiltroDashboard } from "../types/typeDashboard";
import { toast } from "@/hooks/use-toast";

export const usePostDashboard = () => {

  return useMutation<TypeDashboardResponse, Error, TypeFiltroDashboard>(
    (payload) => postHeaderDashboard(payload),
    {
      onError: (error) => {
        toast({
          title: "Erro ao buscar dashboard",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );
};
