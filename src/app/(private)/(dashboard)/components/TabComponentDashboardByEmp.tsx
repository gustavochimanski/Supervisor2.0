"use client";

import { TypeDashboardResponse } from "../types/typeDashboard";
import { VendasPorHoraChart } from "./vendas/ComponentChartVendasbyHour";
import { ComponentMeioPagamento } from "./meiosPagamento/meioPagamento";
import CompanyMetricCards from "./metrics/ComponentCompanyMetricCards";
import { dashboardMock } from "./meiosPagamento/mock";

interface Props {
  codEmpresa: string;
  dashboardData: TypeDashboardResponse;
}

export default function TabComponentDashboardByEmp({
  codEmpresa,
  dashboardData,
}: Props) {
  const compraItem = dashboardData.compras.por_empresa.find(
    (c) => String(c.empresa) === String(codEmpresa)
  );
  const compras = compraItem?.valorTotal ?? 0;

  const meiosEmpresa = dashboardMock.meiosPagamento.por_empresa.find(
    (m) => String(m.empresa) === String(codEmpresa)
  );
  
  const meiosPagamentoData = meiosEmpresa?.meios.map((m) => ({
    empresa: m.tipo,
    valorTotal: m.valorTotal,
  })) ?? [];
  

  return (
    <div className="flex flex-col gap-4">
      <CompanyMetricCards codEmpresa={codEmpresa} data={dashboardData} />

      <div className="flex md:flex-row flex-col gap-4 h-full">
        <VendasPorHoraChart
          data={dashboardData.vendaPorHora}
          empresaSelecionada={codEmpresa}
        />

        <div className="lg:grid lg:grid-cols-2 gap-4 md:w-1/2">
          <ComponentMeioPagamento data={meiosPagamentoData} />
          <ComponentMeioPagamento data={meiosPagamentoData} />
          <div className="col-span-2">
            <ComponentMeioPagamento data={meiosPagamentoData} />
          </div>
        </div>
      </div>

    </div>
  );
}
