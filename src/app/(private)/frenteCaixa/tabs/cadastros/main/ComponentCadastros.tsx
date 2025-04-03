// ./components/ComponentCadastros.tsx

import React from "react";
import { BanknoteIcon, Monitor, User, Settings } from "lucide-react";
import ComponentCaixas from "../../../components/ComponentCaixas";
import ComponentPerfilDeCaixa from "../../../components/ComponentPerfisDeCaixa";
import ComponentMeioPagamento from "../../../components/MeioPagamento/ComponentMeioPag";
import { ComponentPerifericos } from "../subtabs/ComponentPerifericos";
import Tabs from "@/components/shared/tabs";

const ComponentCadastros: React.FC = () => {
  const nestedTabItems = [
    {
        value: "produtos",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={14} /> Produtos
          </span>
        ),
        Component: ComponentMeioPagamento
      },
      {
        value: "entidades",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={14} /> Entidades
          </span>
        ),
        Component: ComponentMeioPagamento
      },
      {
        value: "empresas",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={14} /> Empresas
          </span>
        ),
        Component: ComponentMeioPagamento
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
    <div >
      <Tabs
        items={nestedTabItems}
        containerClassName="w-full border rounded-sm shadow h-full"
        triggerClassName="transition-colors"
        contentClassName="bg-white rounded-sm h-[75.5vh]"
      />
    </div>
  );
};

export default ComponentCadastros;
