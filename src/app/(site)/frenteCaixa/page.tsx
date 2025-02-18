"use client";

import Tabs, { TabItem } from "@/components/shared/tabs"; // ajuste o caminho conforme sua estrutura
import ComponentCaixas from "./Caixas/component";
import ComponentPerfilDeCaixa from "./PerfisDeCaixa/component";
import ComponentMeioPagamento from "./meioPagamento/component";


const tabItems: TabItem[] = [
  { value: "caixas", label: "Caixas", Component: ComponentCaixas },
  { value: "perfil-de-caixa", label: "Perfis de Caixa", Component: ComponentPerfilDeCaixa },
  { value: "meios-de-pagamento", label: "Meios de Pagamento", Component: ComponentMeioPagamento },
];

const PageFrenteCaixa = () => {


  return (
    <div className="max-w-xl mx-auto my-4">
      <Tabs
        items={tabItems}
        containerClassName="w-full border rounded shadow ml-2"
        triggerClassName="transition-colors"
        contentClassName="bg-white"
      />
    </div>
  );
};

export default PageFrenteCaixa;
