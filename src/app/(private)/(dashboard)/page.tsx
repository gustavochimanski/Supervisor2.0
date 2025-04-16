"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ComponentCardHeader from "./components/header/ComponentCardheader";
import { TypeDashboardHeader, TypeFiltroRelatorio } from "./types/typeCardHeader";
import { useState } from "react";
import DashboardMetricCards from "./components/metrics/ComponentMetricCards";

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

const PageDashboard = () => {
  const [dashboardData, setDashboardData] = useState<TypeDashboardHeader | null>(null);

  const initialPayload: TypeFiltroRelatorio = {
    empresa: "001",
    dataInicial: formatDate(new Date()),
    dataFinal: formatDate(new Date()),
  };

  console.log(dashboardData)
  return (
    <Card>
      <CardHeader className="p-0">
        <ComponentCardHeader
          payload={initialPayload}
          onDataReceived={setDashboardData}
        />
      </CardHeader>

      <CardContent className="p-4">
        {dashboardData && <DashboardMetricCards data={dashboardData} />}
      </CardContent>
    </Card>
  );
};

export default PageDashboard;