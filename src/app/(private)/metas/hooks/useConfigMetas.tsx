import { useMutation, useQueryClient } from "react-query";
import { TypeIncluirMetaRequest } from "../types/typeConfigMetas";
import { postNewMeta } from "../services/serviceConfigMetas";

export const usePostNewMeta = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: TypeIncluirMetaRequest) => postNewMeta(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchAllMetas"]);
      },
      onError: (error: any) => {
        console.error("Erro ao salvar nova meta:", error);
      },
    }
  );
};
