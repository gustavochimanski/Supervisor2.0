import { useQuery } from 'react-query';
import api from '@/api/api';
import { PerfilPdv } from './types';

export const useFetchAll = () => {
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

export const useFetchById = (id: string | undefined) => {
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


