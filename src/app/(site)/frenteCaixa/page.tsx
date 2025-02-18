"use client";


import React, { useEffect, useState } from "react";
import Tabs, { TabItem } from "@/components/shared/tabs"; // ajuste o caminho conforme sua estrutura
import ComponentCaixas from "./Caixas/component";
import ComponentPerfilDeCaixa from "./PerfisDeCaixa/component";
import ComponentMeioPagamento from "./meioPagamento/component";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

const tabItems: TabItem[] = [
  { value: "caixas", label: "Caixas", Component: ComponentCaixas },
  { value: "perfil-de-caixa", label: "Perfis de Caixa", Component: ComponentPerfilDeCaixa },
  { value: "meios-de-pagamento", label: "Meios de Pagamento", Component: ComponentMeioPagamento },
];

const PageFrenteCaixa = () => {
  // ==================================================
  // =================== ROTAS ========================
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      // Se não houver token, redirecione para a página de login
      router.push("/login");
    } else {
      // Se houver token, atualiza o estado para permitir renderizar a página
      setIsAuthChecked(true);
    }
  }, [router]);

  // Enquanto a verificação não for concluída, exibe um spinner de carregamento
  if (!isAuthChecked) {
    return <CircularProgress />;
  }
  

  return (
    <div className="max-w-xl mx-auto my-4">
      <Tabs
        items={tabItems}
        containerClassName="w-full border rounded shadow ml-2"
        triggerClassName="transition-colors"
        contentClassName="bg-white"
      />
    </div>
  );
};

export default PageFrenteCaixa;
