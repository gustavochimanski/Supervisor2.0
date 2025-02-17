// services/perfilPdvService.ts
import api from '@/api/api';
import { PerfilPdv, PatchConfPerfilPayload } from './types'

// Busca todos os perfis de caixa
export const fetchAllPerfis = async (): Promise<PerfilPdv[]> => {
  const response = await api.get('/v1/config/perfilpdv');
  return response.data;
};

// Busca um perfil de caixa por ID
export const fetchPerfilById = async (id: string): Promise<PerfilPdv> => {
  const response = await api.get(`/v1/config/perfilpdv/${id}`);
  return response.data;
};

// Cria um novo perfil de caixa
export const postNewPerfil = async (descricao: string) => {
  const response = await api.post('/v1/config/perfilpdv', { descricao });
  return response.data;
};

// Exclui um perfil de caixa por ID
export const deletePerfil = async (id: string) => {
  const response = await api.delete(`/v1/config/perfilpdv/${id}`);
  return response.data;
};

// Atualiza a configuração de um perfil PDV
export const putConfPerfil = async (idPerfil: string, payload: PatchConfPerfilPayload) => {
  const response = await api.put(`/v1/config/confperfil/${idPerfil}`, payload);
  return response.data;
};

// Atualiza a descrição do perfil PDV
export const patchAlteraDescricao = async (idPerfil: string, descricao: string) => {
  const response = await api.patch(`/v1/config/perfilpdv/${idPerfil}`, { descricao });
  return response.data;
};
