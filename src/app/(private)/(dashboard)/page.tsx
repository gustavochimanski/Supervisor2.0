"use client"; 


import { useState, useEffect } from "react";
import {  CardContent } from "@/components/ui/card"; 
import ComponentCardHeader from "./components/header/ComponentCardheader"; // Header com filtros (ex: datas e empresas)
import { usePostDashboard } from "./hooks/useQueryDashboard"; // Hook para enviar o payload e receber os dados do dashboard
import { TypeDashboardResponse, TypeFiltroDashboard } from "./types/typeDashboard"; // Tipagens utilizadas no dashboard
import { formatDateToYYYYMMDD } from "@/utils/format/formatDate"; // Função para formatar data para "yyyy-mm-dd"
import TabComponentDashboardEmpresaGeral from "./components/TabComponentEmpresaGeral"; // Aba com dados gerais
import TabComponentDashboardByEmp from "./components/TabComponentDashboardByEmp"; // Aba com dados por empresa
import TabsWrapper from "@/components/shared/tabs/tabsWrapper"; // Componente de abas/tabulação

export default function PageDashboard() {
  const today = new Date();

  // 🧾 Payload padrão com datas de hoje e array de empresa vazio
  const defaultPayload: TypeFiltroDashboard = {
    empresas: [""],
    dataInicio: formatDateToYYYYMMDD(today),
    dataFinal: formatDateToYYYYMMDD(today),
  };

  // 🎯 Estados principais do componente
  const [payload, setPayload] = useState<TypeFiltroDashboard>(defaultPayload); // Filtros atuais
  const [dashboardData, setDashboardData] = useState<TypeDashboardResponse | null>(null); // Resposta da API


  // 🚀 Hook para enviar o filtro e buscar dados do dashboard
  const { mutateAsync, isLoading, error } = usePostDashboard();

  // 🔁 Dispara a busca dos dados sempre que o payload mudar
  useEffect(() => {
    mutateAsync(payload)
      .then(setDashboardData) // Se der certo, atualiza os dados
      .catch(() => setDashboardData(null)); // Se der erro, zera
  }, [payload, mutateAsync]);

  // 📥 Atualiza o payload a partir do componente de filtros (header)
  const handleChangePayload = (newPayload: TypeFiltroDashboard) => {
    setPayload(newPayload);
  };

  // 🧠 Cria um mapa do código da empresa para o nome reduzido (otimizado com useMemo para não recalcular sempre)


  // 💬 Estados de carregamento, erro ou sem dados
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Deu ruim ao buscar dados.</p>;
  if (!dashboardData) return <p>Nenhum dado.</p>;

  // 🧩 Monta dinamicamente as abas: uma geral + uma para cada empresa
  const tabs = [
    {
      value: "geral", // ID da aba
      label: "Geral", // Nome exibido
      Component: <TabComponentDashboardEmpresaGeral dashboardData={dashboardData} />, // Componente que renderiza o conteúdo da aba GERAL
    },
    ...dashboardData.totais_por_empresa.map((e) => ({
      value: e.lcpr_codempresa,
      label: `${e.lcpr_codempresa} - ${defaultPayload.empresas || "Sem nome"}`, // Nome da aba com código e nome da empresa
      Component: (
        <TabComponentDashboardByEmp
          codEmpresa={e.lcpr_codempresa}
          dashboardData={dashboardData}
        /> // Componente que renderiza o conteúdo de cada EMPRESA
      ),
    })),
  ];

  // 📦 Renderiza o componente final
  return (
    <div>
      {/* Header com formulário de filtros (datas, empresas etc.) */}
      <ComponentCardHeader
        initialPayload={payload}
        onChangePayload={handleChangePayload}
      />

      {/* TABS */}
      <CardContent className="flex-1">
        <TabsWrapper items={tabs} />
      </CardContent>
    </div>
  );
}
