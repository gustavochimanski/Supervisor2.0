"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ComponentCardHeader from "./components/header/ComponentCardheader";
import DashboardMetricCards from "./components/metrics/ComponentMetricCards";
import { usePostDashboard } from "./hooks/useQueryDashboard";
import { TypeDashboardResponse, TypeFiltroDashboard } from "./types/typeDashboard";
import { formatDateToYYYYMMDD } from "@/utils/format/formatDate";
import { ComponentChartVendas } from "./components/ComponentChartVendas";

export default function PageDashboard() {
  const today = new Date();
  const defaultPayload: TypeFiltroDashboard = {
    empresas: ["001"],
    dataInicio: formatDateToYYYYMMDD(today),
    dataFinal: formatDateToYYYYMMDD(today),
  };

  const [payload, setPayload] = useState<TypeFiltroDashboard>(defaultPayload);
  const [dashboardData, setDashboardData] = useState<TypeDashboardResponse | null>(null);

  const { mutateAsync, isLoading, error } = usePostDashboard();

  useEffect(() => {
    mutateAsync(payload)
      .then(setDashboardData)
      .catch(() => setDashboardData(null));
  }, [payload]);

  const handleChangePayload = (newPayload: TypeFiltroDashboard) => {
    setPayload(newPayload);
  };

  return (
    <div>
      <Card className="rounded-t-none h-full flex flex-col">
        <div className="sticky top-0 z-10">
          <ComponentCardHeader
            onChangePayload={handleChangePayload}
            initialPayload={payload}
          />
        </div>

        <CardContent className="p-4 flex-1 overflow-auto gap-4 flex flex-col">
          {isLoading && <p>Carregando...</p>}
          {error && <p>Erro ao buscar dados.</p>}
          {!isLoading && dashboardData && <DashboardMetricCards data={dashboardData} />}
          {!isLoading && !dashboardData && !error && <p>Nenhum dado para exibir.</p>}
          <ComponentChartVendas/>
        </CardContent>
      </Card>

    </div>
  );
}
