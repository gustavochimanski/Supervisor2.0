import { Monitor } from "lucide-react";
import ComponentCaixas from "../cadastros/subtabs/ComponentCaixas";
import Tabs from "@/components/shared/tabs";

export const ComponentProcessos: React.FC = () => {
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
      <div>
        <Tabs
          items={nestedTabItems}
            containerClassName="w-full border rounded-sm  shadow h-full"
            triggerClassName="transition-colors"
            contentClassName="bg-white rounded-sm h-[75.5vh]"
        />
      </div>
    );
  };