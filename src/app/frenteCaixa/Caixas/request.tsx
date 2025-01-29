import api from "@/api/api";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";

// Função para atualizar a descrição
export const atualizarDescricaoMeioPgto = async (
  id: number,
  novaDescricao: string,
  setMensagem: (msg: string) => void,
  setDadosMeioPgto: (prev: (prevState: MeioPgto | null) => MeioPgto | null) => void
) => {
  try {
    const response = await api.patch<MeioPgto>(`/v1/config/meiospgto/${id}`, {
      descricao: novaDescricao,
    });

    console.log("Sucesso:", response.data);
    setMensagem("Descrição atualizada com sucesso!");

    // Atualizar o estado local
    setDadosMeioPgto((prev) =>
      prev ? { ...prev, descricao: novaDescricao } : prev
    );
  } catch (err) {
    console.error("Erro ao atualizar descrição:", err);
    setMensagem("Erro ao atualizar descrição.");
  }
};

// Função para atualizar as configurações com todos os campos
export const atualizarConfigMeioPag = async (
  config: ConfiguracaoMeioPag,
  setMensagem: (msg: string) => void,
  setConfigDadosMeioPgto: (prev: (prevState: ConfiguracaoMeioPag[]) => ConfiguracaoMeioPag[]) => void
) => {
  try {
    const payload = {
      mpgtoId: config.mpgtoId,
      mpgtoCodigo: config.mpgtoCodigo,
      nomeCampo: config.nomeCampo,
      stringValue: config.stringValue,
      integerValue: config.integerValue,
      doubleValue: config.doubleValue,
      dateValue: config.dateValue,
    };

    const response = await api.patch<ConfiguracaoMeioPag>(
      `/v1/config/confmeiospgto/${config.id}`,
      payload
    );

    console.log("Sucesso na atualização de configuração:", response.data);
    setMensagem(`Campo "${config.nomeCampo}" atualizado com sucesso!`);

    // Atualizar o estado local
    setConfigDadosMeioPgto((prev) =>
      prev.map((item) =>
        item.id === config.id ? { ...item, stringValue: config.stringValue } : item
      )
    );
  } catch (err) {
    console.error(`Erro ao atualizar ${config.nomeCampo}:`, err);
    setMensagem(`Erro ao atualizar "${config.nomeCampo}".`);
  }
};
