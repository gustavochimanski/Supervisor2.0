// services/perfilPdvService.ts
import api from '@/app/api/api';
import { PerfilPdv, PatchConfPerfilPayload } from './types'

//====================================================
//=========== BUSCA TODOS PERFIS DE CAIXA ============
//====================================================
export const fetchAllPerfis = async (): Promise<PerfilPdv[]> => {
  const response = await api.get('/v1/config/perfilpdv');
  return response.data;
};

//====================================================
//============== BUSCA PERFIL POR ID =================
//====================================================
export const fetchPerfilById = async (id: string): Promise<PerfilPdv> => {
  const response = await api.get(`/v1/config/perfilpdv/${id}`);
  return response.data;
};

//====================================================
//=========== INSERIR PERFIL POR DESCRICAO ===========
//====================================================
export const postNewPerfilByDescricao = async (descricao: string) => {
  const response = await api.post('/v1/config/perfilpdv', { descricao });
  return response.data;
};

//====================================================
//============== DELETE PERFIL POR ID  ===============
//====================================================
export const deletePerfilById = async (id: string) => {
  const response = await api.delete(`/v1/config/perfilpdv/${id}`);
  return response.data;
};

//====================================================
//============ ATUALIZA CONFIGS POR ID ===============
//====================================================
export const putConfPerfilById = async (idPerfil: string, payload: PatchConfPerfilPayload) => {
  const response = await api.put(`/v1/config/confperfil/${idPerfil}`, payload);
  return response.data;
};

//====================================================
//================ ATUALIZA DESCRICAO ================
//====================================================
export const patchAlteraDescricaoById = async (idPerfil: string, descricao: string) => {
  const response = await api.patch(`/v1/config/perfilpdv/${idPerfil}`, { descricao });
  return response.data;
};
