"use client";

import React, { Suspense } from "react";
import LoaderComponent from "@/components/ui/loader";
import ComponentCaixas from "./components/ComponentCaixas";
import ComponentPerfilDeCaixa from "./components/ComponentPerfisDeCaixa";
import ComponentMeioPagamento from "./components/MeioPagamento/ComponentMeioPag";
import { BanknoteIcon, Monitor, User} from "lucide-react";

const Tabs = React.lazy(() => import("@/components/shared/tabs"));

const tabItems = [
  { value: "caixas",     
    label: (
      <span className="flex items-center gap-2">
        <Monitor size={16}/> Caixas
      </span>
  ),  
  Component: ComponentCaixas },
  { 
    value: "perfil-de-caixa", 
    label: (
      <span className="flex items-center gap-2">
        <User size={16}/> Perfis de Caixa
      </span>
    ), 
    Component: ComponentPerfilDeCaixa 
  },
  { value: "meios-de-pagamento",    
    label: (
      <span className="flex items-center gap-2">
        <BanknoteIcon size={15}/> Meios de Pagamento
      </span>
  ), 
  Component: ComponentMeioPagamento },
];


const PageFrenteCaixa = () => {
  return (
      <div className="w-[95vw] h-[89vh] mx-auto font-sans ">
        <Suspense fallback={<LoaderComponent />}>
          <Tabs
            items={tabItems}
            containerClassName="w-full border rounded-sm m-3 shadow h-full "
            triggerClassName="transition-colors  "
            contentClassName="bg-white rounded-sm h-[85.5vh]  "
          />
        </Suspense>
      </div>
  );
};

export default PageFrenteCaixa;
