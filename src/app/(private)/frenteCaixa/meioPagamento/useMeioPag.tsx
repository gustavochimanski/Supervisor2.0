// hooks/useMeioPagamento.ts
import { useMutation, useQuery, useQueryClient } from "react-query";
import { 
  atualizarConfigMeioPgto, 
  atualizarDescricaoMeioPgto, 
  fetchAllMeioPgto, 
  fetchByIdMeioPgto, 
  incluiMeioPgtoById
} from "./service";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";

//====================================================
//=========== BUSCA MEIO DE PAGAMENTO POR ID =========
//====================================================
export const useFetchByIdMeioPgto = (id: string) => {
  return useQuery<MeioPgto>(
    ["fetchByIdMeioPgto", id],
    () => {
      return fetchByIdMeioPgto(id);
    },{
      enabled: !!id, // Só atualiza se existir ID
    }
  );
};
//====================================================
//======== BUSCA TODOS OS MEIOS DE PAGAMENTO =========
//====================================================
export const useFetchAllMeiosPgto = () => {
  return useQuery<MeioPgto[]>("fetchAllMeioPgto", () => fetchAllMeioPgto());
};


//====================================================
//======== ATUALIZA DESCRICAO MEIO PAGAMENTO =========
//====================================================
export const useAtualizarDescricaoMeioPgto = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, novaDescricao }: { id: string; novaDescricao: string }) => {
      return atualizarDescricaoMeioPgto(id, novaDescricao);
    },
    {
      onSuccess: () => {
        // Invalida a query para que os dados sejam reatualizados
        queryClient.invalidateQueries('fetchAllMeioPgto');

      },
    }
  );
};
//====================================================
//======== ATUALIZA CONFIGS MEIO DE PAGAMENTO ========
//====================================================
export const useAtualizarConfigMpgto = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: ConfiguracaoMeioPag[]) => {
      return await atualizarConfigMeioPgto(payload);
    },
    {
      onSuccess: () => {
        // Invalida a query para atualizar os dados
        queryClient.invalidateQueries('fetchAllMeioPgto');
      },
    }
  );
};
//====================================================
//============ INCLUI MEIO DE PAGAMENTO ==============
//====================================================
export const useIncluiMeioPgto = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ codigo, descricao, tipoMeioPgto }: any) =>
      incluiMeioPgtoById(codigo, descricao, tipoMeioPgto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchAllMeioPgto');
      },
    }
  );
};