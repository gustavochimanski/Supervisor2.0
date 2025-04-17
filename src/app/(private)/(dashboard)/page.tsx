import { postHeaderDashboard } from "./services/serviceDashboard";
import PageDashboardClient from "./ClientComponetDashboard";
import { TypeFiltroRelatorio } from "./types/typeCardHeader";
import { formatDateToYYYYMMDD } from "@/lib/formatDateyyyymmdd";

// Este componente segue como um server component (sem "use client")
const PageDashboard = async () => {
  // Obtemos a data de hoje
  const today = new Date();

  // Payload padrão, iniciando com o dia atual
  const defaultPayload: TypeFiltroRelatorio = {
    empresa: "001",
    dataInicial: formatDateToYYYYMMDD(today),
    dataFinal: formatDateToYYYYMMDD(today),
  };

  // Busca inicial de dados no servidor
  const dashboardData = await postHeaderDashboard(defaultPayload);

  // Passa o payload e dados para o Client Component
  return (
    <PageDashboardClient
      defaultPayload={defaultPayload}
      serverData={dashboardData}
    />
  );
}

export default PageDashboard