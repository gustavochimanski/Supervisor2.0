import Tabs from "@/components/shared/tabs";
import TabConfigCaixas from "./tabs/TabConfigCaixas";
import TabConfigSat from "./tabs/TabSat";
import TabConfigDiretivas from "./tabs/TabDiretivas";
import { ListTodo, Settings, Settings2 } from "lucide-react";
import { useState } from "react";
import { TypeCaixas } from "../../../../types/typesCaixas";

const ComponentConfigCaixas = () => {
  const [dadosSelecionados, setDadosSelecionados] = useState<TypeCaixas | undefined>();

  const TabItems = [
    {
      value: "caixas",
      label: (
        <span className="flex items-center gap-2">
          <Settings size={15} /> Caixas
        </span>
      ),
      Component: () => <TabConfigCaixas data={dadosSelecionados} />,
    },
    {
      value: "sat",
      label: (
        <span className="flex items-center gap-2">
          <Settings2 size={15} /> Sat
        </span>
      ),
      Component: TabConfigSat,
    },
    {
      value: "diretivas",
      label: (
        <span className="flex items-center gap-2">
          <ListTodo size={15} /> Diretivas
        </span>
      ),
      Component: TabConfigDiretivas,
    },
  ];

  return (
    <div className="flex-1 h-full ">
      <Tabs
        items={TabItems}
        containerClassName="w-full rounded-sm shadow h-full flex flex-col"
        triggerClassName="transition-colors"
        contentClassName="bg-sidebar rounded-sm flex-1 overflow-auto"
      />
    </div>
  );
};

export default ComponentConfigCaixas;
