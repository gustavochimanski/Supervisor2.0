// src/components/tabs/TabComponentDashboardByEmp.tsx
"use client";

import { TypeDashboardResponse } from "../types/typeDashboard";
import DashboardMetricCards from "./metrics/ComponentMetricCards";
import { VendasPorHoraChart } from "./vendas/ComponentChartVendas";
import { ComponentMeioPagamento } from "./meiosPagamento/meioPagamento";
import CompanyMetricCards from "./metrics/ComponentCompanyMetricCards";

interface Props {
  codEmpresa: string;
  dashboardData: TypeDashboardResponse;
}

export default function TabComponentDashboardByEmp({
  codEmpresa,
  dashboardData,
}: Props) {
  // 1) pega só as vendasPorHora dessa empresa
  const vendas = dashboardData.vendaPorHora
    .find((v) => v.empresa === codEmpresa)
    ?.vendasPorHora || [];

  // 2) pega só o valor de compras dessa empresa
  const compraItem = dashboardData.compras.por_empresa.find(
    (c) => c.empresa === codEmpresa
  );
  const compras = compraItem?.valorTotal ?? 0;

  // 3) alias só pra deixar claro que é isso que vamos renderizar nos cards
  const metrics = dashboardData;


  return (
    <div className="flex flex-col gap-4">

      {/* MÉTRICAS POR EMPRESA */}
      <CompanyMetricCards
        codEmpresa={codEmpresa}
        data={dashboardData}
      />
      
      <VendasPorHoraChart
        data={[{ empresa: codEmpresa, vendasPorHora: vendas }]}
      />

      <ComponentMeioPagamento
        data={[{ empresa: codEmpresa, valorTotal: compras }]}
      />
    </div>
  );
}
