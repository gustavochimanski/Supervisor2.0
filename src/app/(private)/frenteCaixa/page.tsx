"use client";

import React, { Suspense } from "react";
import LoaderComponent from "@/components/ui/loader";
import { BanknoteIcon, Monitor, User, Settings, FileText, Database, Workflow } from "lucide-react";
import ComponentCaixas from "./components/ComponentCaixas";
import ComponentPerfilDeCaixa from "./components/ComponentPerfisDeCaixa";
import ComponentMeioPagamento from "./components/MeioPagamento/ComponentMeioPag";
import ComponentCadastros from "./tabs/cadastros/main/ComponentCadastros";
import { ComponentProcessos } from "./tabs/cadastros/main/ComponentProcessos";
import { ComponentRelatorios } from "./tabs/cadastros/main/ComponentRelatorios";
import { ComponentConfiguracoes } from "./tabs/cadastros/main/ComponentConfiguracoes";

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
    <div className="w-[95vw]  mx-auto font-sans">
      <Suspense fallback={<LoaderComponent />}>
        <Tabs
          items={tabItems}
          containerClassName="w-full border rounded-sm m-3 shadow "
          triggerClassName="transition-colors"
          contentClassName="bg-white rounded-sm h-[85vh]"
        />
      </Suspense>
    </div>
  );
};

export default PageFrenteCaixa;
