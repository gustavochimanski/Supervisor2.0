// services/meioPagamentoService.ts
import api from "@/api/api";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";

export const atualizarDescricaoMeioPgto = async (id: string, novaDescricao: string ): Promise<MeioPgto> => {
  const response = await api.patch<MeioPgto>(`/v1/config/meiospgto/${id}`, {
    descricao: novaDescricao,
  });
  return response.data;
};

export const atualizarConfigMeioPgto = async (payload: ConfiguracaoMeioPag[]): Promise<ConfiguracaoMeioPag[]> => {
  const response = await api.put<ConfiguracaoMeioPag[]>('/v1/config/confmeiospgto', payload)
  return response.data
}

export const fetchByIdMeioPgto = async (id: string) => {
  const response = await api.get<MeioPgto>(`/v1/config/meiospgto/${id}`)
  return response.data
}