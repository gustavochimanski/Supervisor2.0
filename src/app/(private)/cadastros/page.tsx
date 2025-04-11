

import { BanknoteIcon, Building, CircleUser, HandCoins, LucideShoppingCart, Menu, Monitor, Mouse, Network } from "lucide-react";
import ComponentEmpresas from "./components/tabs/empresas/ComponentEmpresas";
import ComponentMeioPagamento from "./components/tabs/meioPagamento/ComponentMeioPag";
import { ComponentPerifericos } from "./components/tabs/perifericos/ComponentPerifericos";
import ComponentFiscal from "./components/tabs/fiscal/ComponentFiscal";
import ComponentMainCaixas from "./components/tabs/caixas/ComponentMainCaixas";
import ComponentPerfilDeCaixa from "./components/tabs/perfisDeCaixa/ComponentPerfisDeCaixa";
import { fetchAllCaixasSSR } from "./services/CaixasService";
import { fetchAllPerfisSSR } from "./services/PerfisDeCaixaService";
import TabsWrapper from "@/components/shared/tabsWrapper";
import { fetchProdutos } from "./services/ProdutosService"
import ComponentProdutos from "./components/tabs/produtos/ComponentProdutos";
import ComponentUsuarios from "./components/tabs/usuarios/ComponentUsuarios";
;

const PageCadastros = async () => {

  const caixasSSR = await fetchAllCaixasSSR();
  const perfisSSR = await fetchAllPerfisSSR();
  const produtosSSR = await fetchProdutos();


    const nestedTabItems = [
      {
        value: "produtos",
        label: (
          <span className="flex items-center gap-2">
            <LucideShoppingCart size={15} /> Produtos
          </span>
        ),
        Component: <ComponentProdutos produtosSSR={produtosSSR}/>
        },
      {
        value: "caixas",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={15} /> Caixas
          </span>
        ),
        Component: <ComponentMainCaixas caixasSSR={caixasSSR} /> // ✅ JSX direto
      },
      {
        value: "perfilPdv",
        label: (
          <span className="flex items-center gap-2">
            <Network size={15} /> Perfil Pdv
          </span>
        ),
        Component: <ComponentPerfilDeCaixa perfisSSR={perfisSSR} /> // ✅ JSX direto
      },
      {
        value: "usuarios",
        label: (
          <span className="flex items-center gap-2">
            <CircleUser size={15} /> Usuários
          </span>
        ),
        Component: <ComponentUsuarios/>
      },

        {
          value: "empresas",
          label: (
            <span className="flex items-center gap-2">
              <Building size={15} /> Empresas
            </span>
          ),
          Component: <ComponentEmpresas/>
        },
      {
        value: "meios-de-pagamento",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={15} /> Meios de Pagamento
          </span>
        ),
        Component: <ComponentMeioPagamento/>
      },
      {
        value: "perifericos",
        label: (
          <span className="flex items-center gap-2">
            <Mouse size={15} /> Periféricos
          </span>
        ),
        Component: <ComponentPerifericos/> 
      },
      {
        value: "fiscal",
        label: (
          <span className="flex items-center gap-2">
            <HandCoins size={15} /> Fiscal
          </span>
        ),
        Component: <ComponentFiscal/>
      },
      {
        value: "outros",
        label: (
          <span className="flex items-center gap-2">
            <Menu size={15} /> Outros
          </span>
        ),
        Component: <div>Outros</div>,
      }
    ];
  
    return (
      <div className="flex-1 h-full ">
        <TabsWrapper items={nestedTabItems}/>
      </div>
    );
  };

export default PageCadastros