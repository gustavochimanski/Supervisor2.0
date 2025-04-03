import Tabs from "@/components/shared/tabs";
import { Monitor } from "lucide-react";

export const ComponentPerifericos: React.FC = () => {
    const nestedTabItems = [
      {
        value: "impressora",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={14} /> Impressora
          </span>
        ),
        Component: () => <div>🖨️ Configurações de Impressora</div>
      },
      {
        value: "teclado",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={14} /> Teclado
          </span>
        ),
        Component: () => <div>⌨️ Configurações de Teclado</div>
      },
    ];
  
    return (
      <Tabs
        items={nestedTabItems}
        containerClassName="w-full border rounded-sm shadow h-full"
        triggerClassName="transition-colors"
        contentClassName="bg-white rounded-sm h-[70vh]"
      />
    );
  };
  