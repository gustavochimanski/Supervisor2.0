import { useQuery, useMutation } from 'react-query';
import api from '@/api/api';
import { PerfilPdv } from './types';

// ================================================================
// ========================== FETCH ==============================

// BUSCA TODOS OS PERFIS DE CAIXA
export const useFetchAllPerfil = () => {
  return useQuery<PerfilPdv[]>(
    'fetchAllPerfilPdvs',
    async () => {
      const response = await api.get('/v1/config/perfilpdv');
      return response.data;
    },
    {
      staleTime: 60 * 1000, 
    }
  );
};

// BUSCA PERFIL DE CAIXA POR ID
export const useFetchByIdPerfil = (id: string | undefined) => {
  return useQuery<PerfilPdv>(
    ['fetchPerfilPdvById', id],
    async () => {
      const response = await api.get(`/v1/config/perfilpdv/${id}`);
      return response.data;
    },
    {
      enabled: !!id, // A query só será executada se o id existir
      staleTime: 60 * 1000, 
    }
  );
};


// ================================================================
// ========================== POST ==============================

// INCLUI UM NOVO PERFIL DE CAIXA
export const usePostNewPerfilDeCaixa = () => {
  return useMutation(async(descricao:string) =>{
    const response = await api.post("/v1/config/perfilpdv", { descricao });
    return response.data;
  });
};

// APAGA PERFIL DE CAIXA POR ID

export const useDelPerfilDeCaixa = () => {
  return useMutation(async(id: string) => {
    const response = await api.delete(`/v1/config/perfilpdv/${id}`)
    return response.data
  }
)
}


// ================================================================
// ========================== PUT ===============================

// Definindo a interface do payload para a configuração
export interface PatchConfPerfilPayload {
  id: number;
  property: string;
  value: string;
  perfilId: number;
}

// Interface para os parâmetros da mutação, incluindo o idPerfil e o payload
export interface PutConfPerfilParams {
  idPerfil: string;
  payload: PatchConfPerfilPayload;
}

// Hook para atualizar a configuração do perfil PDV
export const usePutConfPerfilPdv = () => {
  return useMutation(
    async ({ idPerfil, payload }: PutConfPerfilParams) => {
      const response = await api.put(`/v1/config/confperfil/${idPerfil}`, payload);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('Configuração do perfil atualizada com sucesso:', data);
        // Aqui você pode, por exemplo, invalidar queries ou exibir uma mensagem de sucesso
      },
      onError: (error) => {
        console.error('Erro ao atualizar a configuração do perfil:', error);
        // Aqui você pode tratar o erro, exibindo uma notificação ou executando outras ações
      },
    }
  );
};