// hooks/useMeioPagamento.ts
import { useMutation, useQuery, useQueryClient } from "react-query";
import { atualizarConfigMeioPgto, atualizarDescricaoMeioPgto } from "./service";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";
import api from "@/api/api";

// Hook para buscar todos os meios de pagamento
export const useFetchAllMeiosPgto = () => {
  return useQuery<MeioPgto[], Error>("fetchAllMeiosPgto", async () => {
    const response = await api.get<MeioPgto[]>("/v1/config/meiospgto");
    return response.data;
  });
};

// Hook para buscar um meio de pagamento pelo ID
export const useFetchByIdMeioPgto = (id: string | undefined) => {
  return useQuery<MeioPgto, Error>(
    ["fetchMeioPgtoById", id],
    async () => {
      if (!id) {
        throw new Error("ID não fornecido");
      }
      const response = await api.get<MeioPgto>(`/v1/config/meiospgto/${id}`);
      return response.data;
    },
    { enabled: !!id } // Só executa se o id estiver definido
  );
}

export const useAtualizarDescricaoMeioPgto = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, novaDescricao }: { id: string; novaDescricao: string }) => {
      console.log(`Dados Enviados id=${id} descricao=${novaDescricao}`)
      return atualizarDescricaoMeioPgto(id, novaDescricao);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchMeiosPgto");
      },
    }
  );
};


export const useAtualizarConfigMpgto = () => {
  const queryClient = useQueryClient(); // Chamada correta do hook

  return useMutation(
    async (payload: ConfiguracaoMeioPag[]) => {
      console.log("Payload a ser atualizado:", payload);
      return await atualizarConfigMeioPgto(payload);
    },
    {
      onSuccess: () => {
        // Invalida a query para que os dados sejam reatualizados, se necessário.
        queryClient.invalidateQueries("fetchAllMeiosPgto");
      },
    }
  );
};