
import { Monitor } from "lucide-react";
import TabsWrapper from "@/components/shared/tabsWrapper";

const ComponentConfiguracoes: React.FC = async () => {
    const nestedTabItems = [
      {
        value: "caixas",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={14} /> Caixas
          </span>
        ),
        Component: <div>Hello</div>,
      }
    ];
  
    return (
      <div className="flex-1 h-full ">
        <TabsWrapper items={nestedTabItems}/>
      </div>
    );
  };

  export default ComponentConfiguracoes