import { Monitor } from "lucide-react";
import ComponentCaixas from "../cadastros/subtabs/ComponentCaixas";
import Tabs from "@/components/shared/tabs";

export const ComponentRelatorios: React.FC = () => {
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
      <div className="p-2">
        <Tabs
          items={nestedTabItems}
            containerClassName="w-full border rounded-sm  shadow h-full"
            triggerClassName="transition-colors"
            contentClassName="bg-white rounded-sm h-[75.5vh]"
        />
      </div>
    );
  };