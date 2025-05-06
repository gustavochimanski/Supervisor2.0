import { TypeDashboardResponse } from "../types/typeDashboard";
import DashboardMetricCards from "./metrics/ComponentMetricCards";
import { VendasPorHoraChart } from "./vendas/ComponentChartVendas";
import { ComponentMeioPagamento } from "./meiosPagamento/meioPagamento";

interface Props { data: TypeDashboardResponse }

export default function TabComponentDashboardEmpresaGeral({ data }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <DashboardMetricCards data={data} />
      <div className="flex gap-4">
        <VendasPorHoraChart data={data.vendaPorHora} />
      </div>
    </div>
  );
}
