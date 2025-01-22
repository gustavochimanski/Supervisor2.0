"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeiosDePagamento, configuracaoColumns } from "./Caixas/columns";
import { DataTable } from "../../components/shared/data-table";
import api from "@/api/api"; // <-- importe a instância com o interceptor

const pages = [
  { nomePage: "Enviar Configuração", value: "enviar-configuracao" },
  { nomePage: "Caixas", value: "caixas" },
  { nomePage: "Meios de Pagamento", value: "meios-de-pagamento" },
  { nomePage: "Processar caixa", value: "processar-caixa" },
];

// Endpoint relativo, pois definimos baseURL = "http://localhost:8080" lá no api.ts
const ENDPOINT_URL = "/v1/config/meiospgto/1";

const PageFrenteCaixa = () => {
  const [data, setData] = useState<MeiosDePagamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Note: agora usamos `api` em vez de `axios`
        const response = await api.get(ENDPOINT_URL);
        // A resposta deve ter { configuracao: [...] }
        setData(response.data.configuracao);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(data[0])
  return (
    <div className="dark">
      <Tabs defaultValue={pages[0].value} className="w-[400px] m-2">
        <TabsList>
          {pages.map((pagina) => (
            <TabsTrigger value={pagina.value} key={pagina.value}>
              {pagina.nomePage}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((pagina) => (
          <TabsContent value={pagina.value} key={pagina.value}>
            <h1>Conteúdo para a página {pagina.nomePage}</h1>
            {loading ? (
              <p>Carregando dados...</p>
            ) : (
              <DataTable columns={configuracaoColumns} data={data} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PageFrenteCaixa;
