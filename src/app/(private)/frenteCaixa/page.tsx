"use client";

import React, { Suspense } from "react";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import LoaderComponent from "@/components/ui/loader";
import ComponentCaixas from "./Caixas/component";
import ComponentPerfilDeCaixa from "./PerfisDeCaixa/component";
import ComponentMeioPagamento from "./meioPagamento/component";

const Tabs = React.lazy(() => import("@/components/shared/tabs"));

const tabItems = [
  { value: "caixas", label: "Caixas", Component: ComponentCaixas },
  { value: "perfil-de-caixa", label: "Perfis de Caixa", Component: ComponentPerfilDeCaixa },
  { value: "meios-de-pagamento", label: "Meios de Pagamento", Component: ComponentMeioPagamento },
];

const PageFrenteCaixa = () => {
  return (
    <ProtectedRoute>
      <div className="w-[95vw] mx-auto mt-5 font-sans rounded-xl">
        <Suspense fallback={<LoaderComponent />}>
          <Tabs
            items={tabItems}
            containerClassName="w-full border rounded-xl m-3 shadow"
            triggerClassName="transition-colors"
            contentClassName="bg-white"
          />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
};

export default PageFrenteCaixa;
