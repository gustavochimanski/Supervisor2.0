
import Tabs from "@/components/shared/tabs";
import ComponentCaixas from "../cadastros/components/tabs/caixas/ComponentCaixas";
import { Monitor } from "lucide-react";

export const ComponentConfiguracoes: React.FC = () => {
    const nestedTabItems = [
      {
        value: "caixas",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={14} /> Caixas
          </span>
        ),
        Component: ComponentCaixas,
      }
    ];
  
    return (
      <div className="flex-1 h-full ">
        <Tabs
          items={nestedTabItems}
          containerClassName="w-full rounded-sm shadow h-full flex flex-col"
          triggerClassName="transition-colors"
          contentClassName="bg-sidebar rounded-sm flex-1 overflow-auto"
        />
      </div>
    );
  };