// hooks/useMeioPagamento.ts
import { useMutation, useQuery, useQueryClient } from "react-query";
import { 
  atualizarConfigMeioPgto, 
  atualizarDescricaoMeioPgto, 
  fetchAllMeioPgto, 
  fetchByIdMeioPgto 
} from "./service";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";
import { error } from "console";

// Hook para buscar todos os meios de pagamento
export const useFetchAllMeiosPgto = () => {
  return useQuery<MeioPgto[]>("fetchAllMeiosPgto", () => fetchAllMeioPgto());
};

export const useFetchByIdMeioPgto = (id: string) => {
  return useQuery<MeioPgto>(
    ["fetchMeioPgtoById", id],
    () => {
      return fetchByIdMeioPgto(id);
    },
    {
      staleTime: 0,
      enabled: !!id,
    }
  );
};


// Hook para atualizar a descrição de um meio de pagamento
export const useAtualizarDescricaoMeioPgto = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, novaDescricao }: { id: string; novaDescricao: string }) => {
      return atualizarDescricaoMeioPgto(id, novaDescricao);
    },
    {
      onSuccess: () => {
        // Invalida a query para que os dados sejam reatualizados
        queryClient.invalidateQueries("fetchMeioPgtoById");

      },
    }
  );
};

// Hook para atualizar a configuração dos meios de pagamento
export const useAtualizarConfigMpgto = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: ConfiguracaoMeioPag[]) => {
      return await atualizarConfigMeioPgto(payload);
    },
    {
      onSuccess: () => {
        // Invalida a query para atualizar os dados
        queryClient.invalidateQueries("fetchMeioPgtoById");
      },
    }
  );
};
