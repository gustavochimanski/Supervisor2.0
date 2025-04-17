"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypeDashboardHeader, TypeFiltroRelatorio } from "./types/typeCardHeader";
import ComponentCardHeader from "./components/header/ComponentCardheader";
import DashboardMetricCards from "./components/metrics/ComponentMetricCards";
import { usePostDashboard } from "./hooks/useCardHeader";

type Props = {
  defaultPayload: TypeFiltroRelatorio;
  serverData: TypeDashboardHeader | null;
};

export default function PageDashboardClient({ defaultPayload, serverData }: Props) {
  const [payload, setPayload] = useState<TypeFiltroRelatorio>(defaultPayload);
  const [dashboardData, setDashboardData] = useState<TypeDashboardHeader | null>(serverData);

  // Usamos o hook de React Query
  const { mutateAsync, isLoading, error } = usePostDashboard();

  useEffect(() => {
    if (JSON.stringify(payload) === JSON.stringify(defaultPayload)) {
      return;
    }

    // Fazemos a busca usando mutateAsync
    (async () => {
      try {
        const result = await mutateAsync(payload);
        setDashboardData(result);
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setDashboardData(null);
      }
    })();

  }, [payload, defaultPayload, mutateAsync]);

  const handleChangePayload = (newPayload: TypeFiltroRelatorio) => {
    setPayload(newPayload);
  };

  return (
    <Card>
      <CardHeader className="p-0">
        <ComponentCardHeader onChangePayload={handleChangePayload} />
      </CardHeader>
      <CardContent className="p-4">

        {/* Exemplo de tratativa visual de loading e erros */}
        {isLoading && <p>Carregando...</p>}
        {error && <p>Ocorreu um erro ao buscar os dados. Tente novamente.</p>}

        {!isLoading && !error && dashboardData ? (
          <DashboardMetricCards data={dashboardData} />
        ) : (
          !isLoading && <p>Nenhum dado para exibir.</p>
        )}
      </CardContent>
    </Card>
  );
}