import { BanknoteIcon, Building, CircleUser, HandCoins, LucideShoppingCart, Menu, Monitor, Mouse, Network } from "lucide-react";

import { TabComponentPerifericos } from "./components/tabs/perifericos/TabComponentPerifericos";
import TabComponentEmpresas from "./components/tabs/empresas/TabComponentEmpresas";
import TabComponentFiscal from "./components/tabs/fiscal/TabComponentFiscal";
import TabComponentMainCaixas from "./components/tabs/caixas/TabComponentMainCaixas";
import TabComponentProdutos from "./components/tabs/produtos/TabComponentProdutos";
import TabComponentPerfilPdv from "./components/tabs/PerfilPdv/TabComponentPerfilPdv";
import TabComponentUsuarios from "./components/tabs/usuarios/TabComponentMainUsuarios";

import TabComponentMeioPagamento from "./components/tabs/meioPagamento/TabComponentMeioPag";
import TabsWrapper from "@/components/shared/tabsWrapper";

import { fetchAllCaixasSSR } from "./services/PdvsService";

const PageCadastros = async () => {

  const caixasSSR = await fetchAllCaixasSSR();


    const nestedTabItems = [
      {
        value: "produtos",
        label: (
          <span className="flex items-center gap-2">
            <LucideShoppingCart size={15} /> Produtos
          </span>
        ),
        Component: <TabComponentProdutos />
        },
      {
        value: "caixas",
        label: (
          <span className="flex items-center gap-2">
            <Monitor size={15} /> Caixas
          </span>
        ),
        Component: <TabComponentMainCaixas caixasSSR={caixasSSR} /> 
      },
      {
        value: "perfilPdv",
        label: (
          <span className="flex items-center gap-2">
            <Network size={15} /> Perfil Pdv
          </span>
        ),
        Component: <TabComponentPerfilPdv  /> 
      },
      {
        value: "usuarios",
        label: (
          <span className="flex items-center gap-2">
            <CircleUser size={15} /> Usuários
          </span>
        ),
        Component: <TabComponentUsuarios/>
      },

        {
          value: "empresas",
          label: (
            <span className="flex items-center gap-2">
              <Building size={15} /> Empresas
            </span>
          ),
          Component: <TabComponentEmpresas/>
        },
      {
        value: "meios-de-pagamento",
        label: (
          <span className="flex items-center gap-2">
            <BanknoteIcon size={15} /> Meios de Pagamento
          </span>
        ),
        Component: (
        <TabComponentMeioPagamento  />
      ),
      },
      {
        value: "perifericos",
        label: (
          <span className="flex items-center gap-2">
            <Mouse size={15} /> Periféricos
          </span>
        ),
        Component: <TabComponentPerifericos/> 
      },
      {
        value: "fiscal",
        label: (
          <span className="flex items-center gap-2">
            <HandCoins size={15} /> Fiscal
          </span>
        ),
        Component: <TabComponentFiscal/>
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