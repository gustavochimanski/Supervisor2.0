"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ComponentCardHeader from "./components/header/ComponentCardheader";
import DashboardMetricCards from "./components/metrics/ComponentMetricCards";
import { usePostDashboard } from "./hooks/useQueryDashboard";
import { TypeDashboardHeader, TypeFiltroRelatorio } from "./types/typeDashboard";
import { formatDateToYYYYMMDD } from "@/utils/format/formatDate";

export default function PageDashboard() {
  const today = new Date();
  const defaultPayload: TypeFiltroRelatorio = {
    empresas: ["001"],
    dataInicio: formatDateToYYYYMMDD(today),
    dataFinal: formatDateToYYYYMMDD(today),
  };

  const [payload, setPayload] = useState<TypeFiltroRelatorio>(defaultPayload);
  const [dashboardData, setDashboardData] = useState<TypeDashboardHeader | null>(null);

  const { mutateAsync, isLoading, error } = usePostDashboard();

  useEffect(() => {
    mutateAsync(payload)
      .then(setDashboardData)
      .catch(() => setDashboardData(null));
  }, [payload]);

  const handleChangePayload = (newPayload: TypeFiltroRelatorio) => {
    setPayload(newPayload);
  };

  return (
    <Card>
      <CardHeader className="p-0 sticky">
        <ComponentCardHeader
          onChangePayload={handleChangePayload}
          initialPayload={payload}
        />
      </CardHeader>

      <CardContent className="p-4">
        {isLoading && <p>Carregando...</p>}
        {error && <p>Erro ao buscar dados.</p>}
        {!isLoading && dashboardData && <DashboardMetricCards data={dashboardData} />}
        {!isLoading && !dashboardData && !error && <p>Nenhum dado para exibir.</p>}
      </CardContent>
    </Card>
  );
}
