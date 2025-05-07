"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ComponentCardHeader from "./components/header/ComponentCardheader";
import { usePostDashboard } from "./hooks/useQueryDashboard";
import { TypeDashboardResponse, TypeFiltroDashboard } from "./types/typeDashboard";
import { formatDateToYYYYMMDD } from "@/utils/format/formatDate";
import TabComponentDashboardEmpresaGeral from "./components/TabComponentEmpresaGeral";
import TabComponentDashboardByEmp from "./components/TabComponentDashboardByEmp";
import TabsWrapper from "@/components/shared/tabsWrapper";
import { useGetEmpresas } from "@/hooks/useQuery/useGetEmpresas";
import { TypeEmpresas } from "@/types/empresas/TypeEmpresas";

export default function PageDashboard() {
  const today = new Date();

  const defaultPayload: TypeFiltroDashboard = {
    empresas: [""],
    dataInicio: formatDateToYYYYMMDD(today),
    dataFinal: formatDateToYYYYMMDD(today),
  };

  const [payload, setPayload] = useState<TypeFiltroDashboard>(defaultPayload);
  const [dashboardData, setDashboardData] = useState<TypeDashboardResponse | null>(null);

  const { data: dataEmpresas = [] } = useGetEmpresas(); // já evita undefined
  const { mutateAsync, isLoading, error } = usePostDashboard();

  useEffect(() => {
    mutateAsync(payload)
      .then(setDashboardData)
      .catch(() => setDashboardData(null));
  }, [payload]);

  const handleChangePayload = (newPayload: TypeFiltroDashboard) => {
    setPayload(newPayload);
  };

  // ✅ Mapear código da empresa para nome reduzido
  const mapaCodigosNomes: Record<string, string> = useMemo(() => {
    return dataEmpresas.reduce((acc: Record<string, string>, empresa: TypeEmpresas) => {
      acc[empresa.empr_codigo] = empresa.empr_nomereduzido?.trim() || "Sem nome";
      return acc;
    }, {});
  }, [dataEmpresas]);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Deu ruim ao buscar dados.</p>;
  if (!dashboardData) return <p>Nenhum dado.</p>;

  const tabs = [
    {
      value: "geral",
      label: "Geral",
      Component: <TabComponentDashboardEmpresaGeral data={dashboardData} />,
    },
    ...dashboardData.totais_por_empresa.map((e) => ({
      value: e.lcpr_codempresa,
      label: `${e.lcpr_codempresa} - ${mapaCodigosNomes[e.lcpr_codempresa] || "Sem nome"}`,
      Component: (
        <TabComponentDashboardByEmp
          codEmpresa={e.lcpr_codempresa}
          dashboardData={dashboardData}
        />
      ),
    })),
  ];

  return (
    <div>
      <ComponentCardHeader
        initialPayload={payload}
        onChangePayload={handleChangePayload}
      />
      <CardContent className="flex-1">
        <TabsWrapper items={tabs} />
      </CardContent>
    </div>
  );
}
