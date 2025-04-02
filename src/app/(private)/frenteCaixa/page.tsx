"use client";

import React, { Suspense } from "react";
import LoaderComponent from "@/components/ui/loader";
import { BanknoteIcon, Monitor, User, Settings, FileText, Database, Workflow } from "lucide-react";
import ComponentCaixas from "./components/ComponentCaixas";
import ComponentPerfilDeCaixa from "./components/ComponentPerfisDeCaixa";
import ComponentMeioPagamento from "./components/MeioPagamento/ComponentMeioPag";

// Carregando componente de Tabs
const Tabs = React.lazy(() => import("@/components/shared/tabs"));

// ----------------- Component Cadastros (com nested tabs) -----------------
const ComponentCadastros: React.FC = () => {
  const nestedTabItems = [
    {
      value: "caixas",
      label: (
        <span className="flex items-center gap-2">
          <Monitor size={14} /> Caixas
        </span>
      ),
      Component: ComponentCaixas,
    },
    {
      value: "perfil-de-caixa",
      label: (
        <span className="flex items-center gap-2">
          <User size={14} /> Perfis de Caixa
        </span>
      ),
      Component: ComponentPerfilDeCaixa
    },
    {
      value: "meios-de-pagamento",
      label: (
        <span className="flex items-center gap-2">
          <BanknoteIcon size={14} /> Meios de Pagamento
        </span>
      ),
      Component: ComponentMeioPagamento
    },
  ];

  return (
    <div className="p-2">
  
      <Tabs
        items={nestedTabItems}
          containerClassName="w-full border rounded-sm  shadow h-full"
          triggerClassName="transition-colors"
          contentClassName="bg-white rounded-sm h-[75.5vh]"
      />
    </div>
  );
};
// ----------------------------------------------------------------------

// ------------------------- Tabs Principais ----------------------------

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
    Component: () => <div>🔄 Aqui entrarão os processos</div>,
  },
  {
    value: "relatorios",
    label: (
      <span className="flex items-center gap-2">
        <FileText size={16} /> Relatórios
      </span>
    ),
    Component: () => <div>📄 Aqui entrarão os relatórios</div>,
  },
  {
    value: "configuracoes",
    label: (
      <span className="flex items-center gap-2">
        <Settings size={16} /> Configurações
      </span>
    ),
    Component: () => <div>⚙️ Aqui entrarão as configurações</div>,
  },
];

// ----------------------------------------------------------------------

const PageFrenteCaixa = () => {
  return (
    <div className="w-[95vw] h-[90vh] mx-auto font-sans">
      <Suspense fallback={<LoaderComponent />}>
        <Tabs
          items={tabItems}
          containerClassName="w-full border rounded-sm m-3 shadow h-full"
          triggerClassName="transition-colors"
          contentClassName="bg-white rounded-sm h-[85.5vh]"
        />
      </Suspense>
    </div>
  );
};

export default PageFrenteCaixa;
