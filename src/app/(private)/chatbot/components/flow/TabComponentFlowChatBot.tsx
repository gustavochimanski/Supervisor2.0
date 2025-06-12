"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchFlowData } from "../../hooks/useFlowService";


export default function TabComponentBotFlowAdminCards() {
  const [botId, setBotId] = useState("00000000-0000-0000-0000-000000000001");
  const [versao, setVersao] = useState(1);
  const [filter, setFilter] = useState("");

  const { nodes, opcoes, isLoading, isError, refetch } = useFetchFlowData(botId, versao);

  const optionsMap = useMemo(() => {
    const map: Record<string, typeof opcoes> = {};
    opcoes.forEach((o) => {
      map[o.from_node] = map[o.from_node] || [];
      map[o.from_node].push(o);
    });
    return map;
  }, [opcoes]);

  const visibleNodes = useMemo(() => {
    return nodes.filter(
      (n) =>
        n.node_id.includes(filter) ||
        n.mensagem.toLowerCase().includes(filter.toLowerCase())
    );
  }, [nodes, filter]);

  return (
    <main className="flex flex-col h-full p-4">
      <header className="flex gap-2 items-end mb-4">
        <Input value={botId} onChange={(e) => setBotId(e.target.value)} placeholder="Bot ID" />
        <Input type="number" value={versao} onChange={(e) => setVersao(Number(e.target.value))} placeholder="Versão" />
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filtrar nodes..." className="ml-auto" />
        <Button onClick={refetch} disabled={isLoading}>
          {isLoading ? "Carregando…" : "Atualizar"}
        </Button>
      </header>

      {isError && <p className="text-red-600 mb-2">Erro ao carregar dados</p>}

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleNodes.map((node) => (
            <Card key={node.node_id} className="shadow-lg p-4">
              <CardContent className="space-y-2">
                <h3 className="font-bold text-lg">{node.node_id}</h3>
                <p><strong>Mensagem:</strong><br />{node.mensagem}</p>
                <p><strong>Ação:</strong> {node.acao || "–"}</p>
                {optionsMap[node.node_id]?.length ? (
                  <>
                    <strong>Opções:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {optionsMap[node.node_id].map((o) => (
                        <Button key={o.opcao_label} size="sm" variant="outline">
                          {o.opcao_label} → {o.to_node}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">Sem opções</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
