"use client"

import { Monitor, Network, RefreshCcwDot, Waypoints } from "lucide-react";
import Tabs from "@/components/shared/tabs";
import ComponentComunicacao from "./components/comunicacao/ComponentComunicacao";
import ComponentProcessamentos from "./components/processamentos/ComponentProcessamentos";
import componentCentralNFCE from "./components/centralNFCE/ComponentCentralNFCE";

const PageProcessos: React.FC = () => {
    const nestedTabItems = [
      {
        value: "centralNFCE",
        label: (
          <span className="flex items-center gap-2">
            <Network size={14} /> Central NFCE
          </span>
        ),
        Component: componentCentralNFCE,
      },
      {
        value: "caixas",
        label: (
          <span className="flex items-center gap-2">
            <Waypoints size={14} /> Comunicação
          </span>
        ),
        Component: ComponentComunicacao,
      },
      {
        value: "processamentos",
        label: (
          <span className="flex items-center gap-2">
            <RefreshCcwDot size={14} /> Processamentos
          </span>
        ),
        Component: ComponentProcessamentos,
      }
    ];
  
    return (
      <div className="flex-1 h-full">
        <Tabs
          items={nestedTabItems}
          containerClassName="w-full rounded-sm shadow h-full flex flex-col"
          triggerClassName="transition-colors"
          contentClassName="bg-sidebar rounded-sm flex-1 overflow-auto"
        />
      </div>
    );
  };

  export default PageProcessos