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