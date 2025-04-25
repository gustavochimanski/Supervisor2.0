import { postHeaderDashboard } from "./services/serviceDashboard";
import PageDashboardClient from "./ClientComponetDashboard";
import { TypeFiltroRelatorio } from "./types/typeDashboard";
import { formatDateToYYYYMMDD } from "@/lib/format/formatDateyyyymmdd";

// Este componente segue como um server component (sem "use client")
const PageDashboard = async () => {
  // Obtemos a data de hoje
  const now = new Date(); // ok
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())); // zera a hora em UTC mesmo
  
  const defaultPayload: TypeFiltroRelatorio = {
    empresas: ["001"],
    dataInicio: formatDateToYYYYMMDD(today),
    dataFinal: formatDateToYYYYMMDD(today),
  };
  

  // Busca inicial de dados no servidor
  const dashboardData = await postHeaderDashboard(defaultPayload);
  console.log("Payload:",defaultPayload)

  // Passa o payload e dados para o Client Component
  return (
    <PageDashboardClient
      defaultPayload={defaultPayload}
      serverData={dashboardData}
    />
  );
}

export default PageDashboard