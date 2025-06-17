import axios from "axios";

interface Node {
  node_id: string;
  mensagem: string;
  acao?: string;
}

interface Opcao {
  from_node: string;
  opcao_label: string;
  to_node: string;
}

type FlowPayload = {
  bot_id: string;
  versao: number;
};

const urlApi = "http://69.62.93.161:8000/flow"

export const fetchNodes = async (payload: FlowPayload): Promise<Node[]> => {
  const { data } = await axios.post(`${urlApi}/nodes`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const fetchOpcoes = async (payload: FlowPayload): Promise<Opcao[]> => {
  const { data } = await axios.post(`${urlApi}/opcoes`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};
