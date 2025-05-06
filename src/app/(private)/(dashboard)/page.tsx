"use client";

import { useState, useEffect } from "react";
import { Card, CardContent} from "@/components/ui/card";
import ComponentCardHeader from "./components/header/ComponentCardheader";
import { usePostDashboard } from "./hooks/useQueryDashboard";
import { TypeDashboardResponse, TypeFiltroDashboard } from "./types/typeDashboard";
import { formatDateToYYYYMMDD } from "@/utils/format/formatDate";

import TabComponentDashboardEmpresaGeral from "./components/TabComponentEmpresaGeral";
import TabComponentDashboardByEmp from "./components/TabComponentDashboardByEmp";
import TabsWrapper from "@/components/shared/tabsWrapper";
import { useGetEmpresas } from "@/hooks/useQuery/useGetEmpresas";

export default function PageDashboard() {
  const today = new Date();
  const { data: dataEmpresas } = useGetEmpresas()

  console.log(dataEmpresas)
  
  const defaultPayload: TypeFiltroDashboard = {
    empresas: dataEmpresas?.map((e) => e.empr_codigo) ?? [],
    dataInicio: formatDateToYYYYMMDD(today),
    dataFinal: formatDateToYYYYMMDD(today),
  };

  const [payload, setPayload] = useState<TypeFiltroDashboard>(defaultPayload);
  const [dashboardData, setDashboardData] = useState<TypeDashboardResponse | null>(null);

  const { mutateAsync, isLoading, error } = usePostDashboard();

  useEffect(() => {
    mutateAsync(payload)
      .then(setDashboardData)
      .catch(() => setDashboardData(null));
  }, [payload]);

  const handleChangePayload = (newPayload: TypeFiltroDashboard) => {
    setPayload(newPayload);
  };


  if (isLoading) return <p>Carregando...</p>;
  if (error)     return <p>Deu ruim ao buscar dados.</p>;
  if (!dashboardData) return <p>Nenhum dado.</p>;

  // Cria uma tab “Geral” + uma por empresa que veio no dados totais_por_empresa
  const tabs = [
    {
      value: "geral",
      label: "Geral",
      Component: <TabComponentDashboardEmpresaGeral data={dashboardData} />
    },
    ...dashboardData.totais_por_empresa.map((e) => ({
      value: e.lcpr_codempresa,
      label: e.lcpr_codempresa,
      Component: (
        <TabComponentDashboardByEmp
          codEmpresa={e.lcpr_codempresa}
          dashboardData={dashboardData}
        />
      )
    }))
  ];

  return (
    <Card className="h-full flex flex-col">
      <ComponentCardHeader
        initialPayload={payload}
        onChangePayload={handleChangePayload}
      />
      <CardContent className="p-4 flex-1">
        <TabsWrapper items={tabs} />
      </CardContent>
    </Card>
  );
}
