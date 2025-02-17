// hooks/usePerfilPdv.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchAllPerfis,
  fetchPerfilById,
  postNewPerfil,
  deletePerfil,
  putConfPerfil,
  patchAlteraDescricao,
} from './perfilService';
import { PatchConfPerfilPayload, PerfilPdv} from './types';

// Hook para buscar todos os perfis de caixa
export const useFetchAllPerfil = () => {
  return useQuery<PerfilPdv[]>('fetchAllPerfilPdvs', fetchAllPerfis, {
    staleTime: 60 * 1000,
  });
};

// Hook para buscar um perfil por ID
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

// Hook para criar um novo perfil de caixa
export const usePostNewPerfil = () => {
  const queryClient = useQueryClient();

  return useMutation(postNewPerfil, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAllPerfilPdvs'); // Atualiza a lista após a inserção
    },
  });
};

// Hook para deletar um perfil de caixa
export const useDelPerfil = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePerfil, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAllPerfilPdvs'); // Atualiza a lista após a remoção
    },
  });
};

// Hook para atualizar a configuração do perfil PDV
export const usePutConfPerfilPdv = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ idPerfil, payloadArray }: { idPerfil: string; payloadArray: PatchConfPerfilPayload[] }) => {
      // Envia cada item do array separadamente
      for (const payload of payloadArray) {
        console.log(idPerfil, payload)
        await putConfPerfil(idPerfil, payload);
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

// ===================================================================
// ========= Hook para atualizar a descrição do perfil PDV ===========
export const usePutAlteraDescricao = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ idPerfil, descricao }: { idPerfil: string; descricao: string }) =>
      patchAlteraDescricao(idPerfil, descricao),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchAllPerfilPdvs'); // Atualiza os dados no cache
      },
    }
  );
};
