// app/seu-caminho/page.tsx (Server Component)
import { Network, RefreshCcwDot, Waypoints } from "lucide-react";
import ComponentComunicacao from "./components/comunicacao/ComponentComunicacao";
import ComponentProcessamentos from "./components/processamentos/ComponentProcessamentos";
import ComponentCentralNFCE from "./components/centralNFCE/ComponentCentralNFCE";
import TabsWrapper from "@/components/shared/tabsWrapper";
import { fetchDadosCentralNFCE } from "./hooks/fetchCentralNFCE";

const PageProcessos = async () => {
  const dadosCentralNFCE = await fetchDadosCentralNFCE();
  
  const nestedTabItems = [
    {
      value: "centralNFCE",
      label: (
        <span className="flex items-center gap-2">
          <Network size={14} /> Central NFCE
        </span>
      ),
      Component: <ComponentCentralNFCE  dados={dadosCentralNFCE}/>,
    },
    {
      value: "caixas",
      label: (
        <span className="flex items-center gap-2">
          <Waypoints size={14} /> Comunicação
        </span>
      ),
      Component: <ComponentComunicacao />,
    },
    {
      value: "processamentos",
      label: (
        <span className="flex items-center gap-2">
          <RefreshCcwDot size={14} /> Processamentos
        </span>
      ),
      Component: <ComponentProcessamentos />,
    }
  ];

  return (
    <div className="flex-1 h-full">
      <TabsWrapper items={nestedTabItems} />
    </div>
  );
};

export default PageProcessos;
