import { TypeDashboardResponse } from "../types/typeDashboard";
import DashboardMetricCards from "./metrics/ComponentMetricCards";
import { VendasPorHoraChart } from "./vendas/ComponentChartVendasbyHour";

interface Props { data: TypeDashboardResponse }

export default function TabComponentDashboardEmpresaGeral({ data }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <DashboardMetricCards data={data} />
      <div className="flex gap-4">
        Aqui vai um gráfico com a participação geral das empresas
      </div>
    </div>
  );
}
