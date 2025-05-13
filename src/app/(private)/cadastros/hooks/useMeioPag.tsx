import { useMutation, useQuery, useQueryClient } from "react-query";
import { 
  atualizarConfigMeioPgto, 
  atualizarDescricaoMeioPgto, 
  fetchAllMeioPgto, 
  fetchByIdMeioPgto, 
  incluiMeioPgtoById
} from "../services/MeioPagtoService";
import { ConfiguracaoMeioPag, MeioPgto } from "../types/typesMeioPag";
import { useToast } from "@/hooks/use-toast";

//====================================================
//=========== BUSCA MEIO DE PAGAMENTO POR ID =========
//====================================================
export const useFetchByIdMeioPgto = (id: string) => {
  const { toast } = useToast();

  return useQuery<MeioPgto>(
    ["fetchByIdMeioPgto", id],
    () => fetchByIdMeioPgto(id),
    {
      enabled: !!id,
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro ao buscar!",
          description: error?.message || "Não foi possível carregar o meio de pagamento.",
        });
      }
    }
  );
};

//====================================================
//======== BUSCA TODOS OS MEIOS DE PAGAMENTO =========
//====================================================
export const useFetchAllMeiosPgto = () => {
  const { toast } = useToast();

  return useQuery<MeioPgto[]>(
    "fetchAllMeioPgto",
    fetchAllMeioPgto,
    {
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro ao buscar!",
          description: error?.message || "Não foi possível carregar os meios de pagamento.",
        });
      }
    }
  );
};

//====================================================
//======== ATUALIZA DESCRICAO MEIO PAGAMENTO =========
//====================================================
export const useAtualizarDescricaoMeioPgto = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    async ({ id, novaDescricao }: { id: string; novaDescricao: string }) => {
      return atualizarDescricaoMeioPgto(id, novaDescricao);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchAllMeioPgto');
        toast({
          title: "Descrição atualizada!",
          description: "O meio de pagamento foi atualizado com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro ao atualizar!",
          description: error?.message || "Não foi possível atualizar a descrição.",
        });
      }
    }
  );
};

//====================================================
//======== ATUALIZA CONFIGS MEIO DE PAGAMENTO ========
//====================================================
export const useAtualizarConfigMpgto = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    async (payload: ConfiguracaoMeioPag[]) => atualizarConfigMeioPgto(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchAllMeioPgto');
        toast({
          title: "Configurações salvas!",
          description: "As configurações foram atualizadas com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro nas configurações!",
          description: error?.message || "Não foi possível salvar as configurações.",
        });
      }
    }
  );
};

//====================================================
//============ INCLUI MEIO DE PAGAMENTO ==============
//====================================================
export const useIncluiMeioPgto = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    ({ descricao, tipoMeioPgto }: any) =>
      incluiMeioPgtoById(descricao, tipoMeioPgto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchAllMeioPgto');
        toast({
          title: "Meio de pagamento incluído!",
          description: "Novo meio de pagamento adicionado com sucesso.",
        });
      },
      onError: (error: any) => {
        console.error("Erro ao incluir meio de pagamento:", error);
        toast({
          variant: "destructive",
          title: "Erro ao incluir!",
          description: error?.message || "Não foi possível adicionar o meio de pagamento.",
        });
      },
    }
  );
};
