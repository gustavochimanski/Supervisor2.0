// hooks/usePerfilPdv.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchAllPerfis,
  fetchPerfilById,
  deletePerfilById,
  postNewPerfilByDescricao,
  putConfPerfilById,
  patchAlteraDescricaoById, } from "../services/PerfisDeCaixaService"
import { PatchConfPerfilPayload, PerfilPdv} from '../Types/typesPerfisDeCaixa';

//====================================================
//=========== BUSCA TODOS PERFIS DE CAIXA ============
//====================================================
export const useFetchAllPerfil = () => {
  return useQuery<PerfilPdv[]>('fetchAllPerfilPdvs', fetchAllPerfis, {
    staleTime: 60 * 1000,
  });
};

//====================================================
//============== BUSCA PERFIL POR ID =================
//====================================================
export const useFetchByIdPerfil = (id: string | undefined) => {
  return useQuery<PerfilPdv>(
    ['fetchPerfilPdvById', id],
    () => fetchPerfilById(id!),
    {
      enabled: !!id, // Só executa se houver um ID
      staleTime: 60 * 1000,
    }
  );
};

//====================================================
//=========== INSERIR PERFIL POR DESCRICAO ===========
//====================================================
export const usePostNewPerfil = () => {
  const queryClient = useQueryClient();

  return useMutation(postNewPerfilByDescricao, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAllPerfilPdvs'); // Atualiza a lista após a inserção
    },
  });
};

//====================================================
//============== DELETE PERFIL POR ID  ===============
//====================================================
export const useDelPerfil = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePerfilById, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAllPerfilPdvs'); // Atualiza a lista após a remoção
    },
  });
};

//====================================================
//============ ATUALIZA CONFIGS POR ID ===============
//====================================================
export const usePutConfPerfilPdv = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ idPerfil, payloadArray }: { idPerfil: string; payloadArray: PatchConfPerfilPayload[] }) => {
      // Envia cada item do array separadamente
      for (const payload of payloadArray) {
        console.log(idPerfil, payload)
        await putConfPerfilById(idPerfil, payload);
      }
    },
    {
      onSuccess: () => {
        console.log('Todas as configurações foram atualizadas com sucesso');
        queryClient.invalidateQueries('fetchAllPerfilPdvs'); // Atualiza os dados no cache
      },
      onError: (error) => {
        console.error('Erro ao atualizar as configurações:', error);
      },
    }
  );
};

//====================================================
//================ ATUALIZA DESCRICAO ================
//====================================================
export const usePutAlteraDescricao = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ idPerfil, descricao }: { idPerfil: string; descricao: string }) =>
      patchAlteraDescricaoById(idPerfil, descricao),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchAllPerfilPdvs'); // Atualiza os dados no cache
      },
    }
  );
};
