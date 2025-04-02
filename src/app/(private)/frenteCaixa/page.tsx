"use client";

import React, { Suspense } from "react";
import LoaderComponent from "@/components/ui/loader";
import ComponentCaixas from "./components/Caixas";
import ComponentPerfilDeCaixa from "./components/PerfisDeCaixa";
import ComponentMeioPagamento from "./components/MeioPagamento/main";

const Tabs = React.lazy(() => import("@/components/shared/tabs"));

const tabItems = [
  { value: "caixas", label: "Caixas", Component: ComponentCaixas },
  { value: "perfil-de-caixa", label: "Perfis de Caixa", Component: ComponentPerfilDeCaixa },
  { value: "meios-de-pagamento", label: "Meios de Pagamento", Component: ComponentMeioPagamento },
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
