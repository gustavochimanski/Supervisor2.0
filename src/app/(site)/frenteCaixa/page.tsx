"use client";

import Tabs, { TabItem } from "@/components/shared/tabs"; // ajuste o caminho conforme sua estrutura
import ComponentCaixas from "./Caixas/component";
import ComponentPerfilDeCaixa from "./PerfisDeCaixa/component";
import ComponentMeioPagamento from "./meioPagamento/component";
import ProtectedRoute from "@/components/ProtectedRoute";


const tabItems: TabItem[] = [
  { value: "caixas", label: "Caixas", Component: ComponentCaixas },
  { value: "perfil-de-caixa", label: "Perfis de Caixa", Component: ComponentPerfilDeCaixa },
  { value: "meios-de-pagamento", label: "Meios de Pagamento", Component: ComponentMeioPagamento },
];

const PageFrenteCaixa = () => {


  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto my-4 font-ubuntu rounded-xl">
        <Tabs
          items={tabItems}
          containerClassName="w-full border rounded-xl shadow ml-2"
          triggerClassName="transition-colors"
          contentClassName="bg-white"
        />
      </div>
    </ProtectedRoute>
  );
};

export default PageFrenteCaixa;
