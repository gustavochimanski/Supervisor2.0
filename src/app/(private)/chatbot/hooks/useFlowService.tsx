import { useQuery } from "react-query";
import { fetchNodes, fetchOpcoes } from "../services/flowService";

export const useFetchFlowData = (bot_id: string, versao: number) => {
  const payload = { bot_id, versao };

  const nodesQuery = useQuery(["nodes", bot_id, versao], () => fetchNodes(payload));
  const opcoesQuery = useQuery(["opcoes", bot_id, versao], () => fetchOpcoes(payload));

  return {
    nodes: nodesQuery.data || [],
    opcoes: opcoesQuery.data || [],
    isLoading: nodesQuery.isLoading || opcoesQuery.isLoading,
    isError: nodesQuery.isError || opcoesQuery.isError,
    refetch: () => {
      nodesQuery.refetch();
      opcoesQuery.refetch();
    },
  };
};
