import Tabs from "@/components/shared/tabs";
import { Keyboard, Monitor, Printer } from "lucide-react";

const ComponentFiscal = () => {

    const nestedTabItems = [
      {
        value: "Outros",
        label: (
          <span className="flex items-center gap-2">
            <Printer size={14} /> Tributações
          </span>
        ),
        Component: <div>🖨️ Tributações</div>
      },
      {
        value: "outros",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={14} /> Outros
          </span>
        ),
        Component: <div>⌨️ Outros</div>
      },
    ];

  
    return (
      <Tabs
        items={nestedTabItems}
        containerClassName="w-full rounded-sm shadow h-full"
        triggerClassName="transition-colors"
        contentClassName="bg-sidebarrounded-sm h-[70vh]"
      />
    );
  };
  

export default ComponentFiscal
