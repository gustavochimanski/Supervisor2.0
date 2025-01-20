"use client"

import { DashboardComparativo } from "@/components/shared/CardDashboard/DashComparativo";
import { DashboardComparativoMeses } from "@/components/shared/CardDashboard/DashCompMeses";
import { DashBoardVendas } from "@/components/shared/CardDashboard/DashVendas";
import { DashboardMeioPagamento } from "@/components/shared/CardDashboard/DashMeioPgt";

export default function Page() {

  const chartData = [
  { nome: "", valores: 1950.50, fill: "hsl(var(--chart-1))" },
  { nome: "Novo Lider", valores: 200, fill: "hsl(var(--chart-2))" },
  { nome: "Tef Débito", valores: 187, fill: "hsl(var(--chart-3))" },
  { nome: "Convênio", valores: 173, fill: "hsl(var(--chart-4))" },
  { nome: "other", valores: 90, fill: "hsl(var(--chart-5))" },
  ];

  const chartConfig = {
    "Campo Limpo": { label: "mpo", color: "hsl(var(--chart-1))" },
    "Novo Lider": { label: "Novo Lider", color: "hsl(var(--chart-2))" },
    "Tef Débito": { label: "Tef Débito", color: "hsl(var(--chart-3))" },
    "Convênio": { label: "Convênio", color: "hsl(var(--chart-4))" },
    "Other": { label: "Other", color: "hsl(var(--chart-5))" },
  };

  const Data = [
    { label: "Ticket Medio", value: "54,96" },
    { label: "Margem", value: "30%" },
    { label: "Total", value: "120,00" },
    { label: "Desconto", value: "10%" },
  ];
  return (
    <div className="flex flex-wrap gap-4 p-2">

      <DashboardMeioPagamento></DashboardMeioPagamento>

      <DashBoardVendas></DashBoardVendas>

      <DashboardComparativo></DashboardComparativo>

      <DashboardComparativoMeses></DashboardComparativoMeses>
    </div>
  )
}
