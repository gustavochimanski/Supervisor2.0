"use client";

import React, { Suspense } from "react";
import LoaderComponent from "@/components/ui/loader";
import { Settings, FileText, Database, Workflow } from "lucide-react";
import ComponentCadastros from "./components/tabs/cadastros/ComponentCadastros";
import { ComponentProcessos } from "./components/tabs/processos/ComponentProcessos";
import { ComponentRelatorios } from "./components/tabs/relatorios/ComponentRelatorios";
import { ComponentConfiguracoes } from "./components/tabs/config/ComponentConfiguracoes";


// Carregando componente de Tabs
const Tabs = React.lazy(() => import("@/components/shared/tabs"));

// ------------------------- Tabs PRINCIPAIS ----------------------------

const tabItems = [
  {
    value: "cadastros",
    label: (
      <span className="flex items-center gap-2">
        <Database size={16} /> Cadastros
      </span>
    ),
    Component: ComponentCadastros,
  },
  {
    value: "processos",
    label: (
      <span className="flex items-center gap-2">
        <Workflow size={16} /> Processos
      </span>
    ),
    Component: ComponentProcessos,
  },
  {
    value: "relatorios",
    label: (
      <span className="flex items-center gap-2">
        <FileText size={16} /> Relatórios
      </span>
    ),
    Component: ComponentRelatorios,
  },
  {
    value: "configuracoes",
    label: (
      <span className="flex items-center gap-2">
        <Settings size={16} /> Configurações
      </span>
    ),
    Component: ComponentConfiguracoes,
  },
];

// ----------------------------------------------------------------------

const PageFrenteCaixa = () => {
  return (
    <div className="w-full h-screen flex justify-center font-sans">
      <Suspense fallback={<LoaderComponent />}>
        <div className="w-[95vw] rounded-sm shadow  mb-[70px] ml-3 flex flex-col">
          <Tabs
            items={tabItems}
            containerClassName="flex flex-col flex-1  h-full"
            triggerClassName="transition-colors"
            contentClassName="bg-sidebar rounded-sm flex-1 overflow-auto"
          />
        </div>
      </Suspense>
    </div>
  );
};



export default PageFrenteCaixa;
