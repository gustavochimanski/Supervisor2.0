// ./components/ComponentCadastros.tsx

import React from "react";
import { BanknoteIcon, Monitor, User, Settings } from "lucide-react";

import Tabs from "@/components/shared/tabs";
import ComponentMeioPagamento from "./subtabs/meioPagamento/ComponentMeioPag";
import { ComponentPerifericos } from "./subtabs/perifericos/ComponentPerifericos";
import ComponentProdutos from "./subtabs/ComponentProdutos";
import ComponentEntidades from "./subtabs/ComponentEntidades";
import ComponentCaixas from "./subtabs/ComponentCaixas";
import ComponentPerfilDeCaixa from "./subtabs/ComponentPerfisDeCaixa";
import ComponentEmpresas from "./subtabs/ComponentEmpresas";

const ComponentCadastros: React.FC = () => {
  const nestedTabItems = [
    {
        value: "produtos",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={14} /> Produtos
          </span>
        ),
        Component: ComponentProdutos,
      },
      {
        value: "entidades",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={14} /> Entidades
          </span>
        ),
        Component: ComponentEntidades,
      },
      {
        value: "empresas",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={14} /> Empresas
          </span>
        ),
        Component: ComponentEmpresas
      },
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
      Component: ComponentPerfilDeCaixa,
    },
    {
      value: "meios-de-pagamento",
      label: (
        <span className="flex items-center gap-2">
          <BanknoteIcon size={14} /> Meios de Pagamento
        </span>
      ),
      Component: ComponentMeioPagamento,
    },
    {
      value: "perifericos",
      label: (
        <span className="flex items-center gap-2">
          <Settings size={14} /> Periféricos
        </span>
      ),
      Component: ComponentPerifericos 
    }
  ];

  return (
    <div className="flex-1 h-full ">
      <Tabs
        items={nestedTabItems}
        containerClassName="w-full rounded-sm shadow h-full flex flex-col"
        triggerClassName="transition-colors"
        contentClassName="bg-sidebar rounded-sm flex-1 overflow-auto"
      />
    </div>
  );
};

export default ComponentCadastros;
