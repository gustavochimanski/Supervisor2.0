"use client"
import Tabs from "@/components/shared/tabs";
import { BanknoteIcon, Building, HandCoins, LucideShoppingCart, Menu, Monitor, Mouse, User } from "lucide-react";
import ComponentCaixas from "./components/tabs/ComponentCaixas";
import ComponentUsuarios from "./components/tabs/ComponentUsuarios";
import ComponentProdutos from "./components/tabs/ComponentProdutos";
import ComponentEmpresas from "./components/tabs/ComponentEmpresas";
import ComponentMeioPagamento from "./components/tabs/meioPagamento/ComponentMeioPag";
import { ComponentPerifericos } from "./components/tabs/perifericos/ComponentPerifericos";
import ComponentFiscal from "./components/tabs/ComponentFiscal";

const PageCadastros: React.FC = () => {
    const nestedTabItems = [
      {
        value: "caixas",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={15} /> Caixas
          </span>
        ),
        Component: ComponentCaixas,
      },
      {
        value: "usuarios",
        label: (
          <span className="flex items-center gap-2">
            <User size={15} /> Usuários
          </span>
        ),
        Component: ComponentUsuarios
      },
      {
          value: "produtos",
          label: (
            <span className="flex items-center gap-2">
              <LucideShoppingCart size={15} /> Produtos
            </span>
          ),
          Component: ComponentProdutos,
        },
        {
          value: "empresas",
          label: (
            <span className="flex items-center gap-2">
              <Building size={15} /> Empresas
            </span>
          ),
          Component: ComponentEmpresas
        },
      {
        value: "meios-de-pagamento",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={15} /> Meios de Pagamento
          </span>
        ),
        Component: ComponentMeioPagamento,
      },
      {
        value: "perifericos",
        label: (
          <span className="flex items-center gap-2">
            <Mouse size={15} /> Periféricos
          </span>
        ),
        Component: ComponentPerifericos 
      },
      {
        value: "fiscal",
        label: (
          <span className="flex items-center gap-2">
            <HandCoins size={15} /> Fiscal
          </span>
        ),
        Component: ComponentFiscal,
      },
      {
        value: "outros",
        label: (
          <span className="flex items-center gap-2">
            <Menu size={15} /> Outros
          </span>
        ),
        Component: () => <div>Outros</div>,
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

export default PageCadastros