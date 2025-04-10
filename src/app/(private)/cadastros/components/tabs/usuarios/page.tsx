

import { User, Users } from "lucide-react";
import TabsWrapper from "@/components/shared/tabsWrapper";

export const ComponentUsuarios: React.FC = () => {
    const nestedTabItems = [
      {
        value: "usuarios",
        label: (
          <span className="flex items-center gap-2">
            <User size={14} /> Usuários
          </span>
        ),
        Component: <div>Hello</div>,
      },
      {
        value: "grupoUsuarios",
        label: (
          <span className="flex items-center gap-2">
            <Users size={14} /> Grupo Usuários
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