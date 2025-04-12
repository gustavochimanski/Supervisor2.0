
import api from '@/app/api/api';
import { PatchConfPerfilPayload, PerfilPdv } from '../types/typesPerfisDeCaixa';
import { auth } from '@/auth';
import apiSSR from '@/app/api/apiSSR';


// ======================================================================================
// ================================ CLIENT ==============================================
// ======================================================================================

//====================================================
//=========== BUSCA TODOS PERFIS DE CAIXA ============
//====================================================
export const fetchAllPerfis = async (): Promise<PerfilPdv[]> => {
  const response = await api.get('config/perfilpdv');
  return response.data;
};

//====================================================
//============== BUSCA PERFIL POR ID =================
//====================================================
export const fetchPerfilById = async (id: string): Promise<PerfilPdv> => {
  const response = await api.get(`config/perfilpdv/${id}`);
  return response.data;
};

//====================================================
//=========== INSERIR PERFIL POR DESCRICAO ===========
//====================================================
export const postNewPerfilByDescricao = async (descricao: string) => {
  const response = await api.post('config/perfilpdv', { descricao });
  return response.data;
};

//====================================================
//============== DELETE PERFIL POR ID  ===============
//====================================================
export const deletePerfilById = async (id: string) => {
  const response = await api.delete(`config/perfilpdv/${id}`);
  return response.data;
};

//====================================================
//============ ATUALIZA CONFIGS POR ID ===============
//====================================================
export const putConfPerfilById = async (idPerfil: string, payload: PatchConfPerfilPayload) => {
  const response = await api.put(`config/confperfil/${idPerfil}`, payload);
  return response.data;
};

//====================================================
//================ ATUALIZA DESCRICAO ================
//====================================================
export const patchAlteraDescricaoById = async (idPerfil: string, descricao: string) => {
  const response = await api.patch(`config/perfilpdv/${idPerfil}`, { descricao });
  return response.data;
};



// ======================================================================================
// ================================== SSR ===============================================
// ======================================================================================

export const fetchAllPerfisSSR = async (): Promise<PerfilPdv[]> => {
  const api = await apiSSR(); // token já incluso
  const response = await api.get('config/perfilpdv');
  return response.data;
};

