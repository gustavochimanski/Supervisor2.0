"use client";

import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { TypeDashboardHeader } from "../../types/typeDashboard";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { TotaisGeraisMeta } from "../../types/typeMetas";
import { formatCurrency, formatInt } from "@/lib/format/formatNumber";

type Props = { data: TypeDashboardHeader };

// Cores normais para progresso positivo (ex: metas de venda)
const getProgressColor = (percentual: number) => {
  if (percentual >= 100) return "bg-green-500";
  if (percentual >= 60) return "bg-blue-500";
  if (percentual >= 30) return "bg-yellow-500";
  return "bg-red-500";
};

// Cores invertidas para metas negativas (ex: limite de compra)
const getProgressColorInverted = (percentual: number) => {
  if (percentual >= 95) return "bg-red-500";
  if (percentual >= 70) return "bg-yellow-500";
  if (percentual >= 40) return "bg-blue-500";
  return "bg-green-500";
};

// barra de progresso, com controle de inversão
const getProgressBar = (progresso: number, labelProgress: string, invertido = false) => {
  const percentual = Math.min(Math.round(progresso * 100), 999);
  const cor = invertido ? getProgressColorInverted(percentual) : getProgressColor(percentual);

  return (
    <div className="mt-2 w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{labelProgress}</span>
        <span className="font-medium">{percentual}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${cor} transition-all duration-500 ease-in-out`}
          style={{ width: `${Math.min(percentual, 100)}%` }}
        />
      </div>
    </div>
  );
};

// Pega valor da meta por tipo
const getMetaValor = (metas: TotaisGeraisMeta[], tipo: TotaisGeraisMeta["tipo"]) => {
  return metas.find((meta) => meta.tipo === tipo)?.valorMeta ?? 0;
};

const DashboardMetricCards = ({ data }: Props) => {
  const total = data.total_geral;
  const metas = data.metas;
  const compras = data.compras;

  const metaVendaValor = getMetaValor(metas.total_geral, "metaVenda");
  // const metaMargem = getMetaValor(metas.total_geral, "metaMargem")
  const limiteCompraValor = getMetaValor(metas.total_geral, "limiteCompra");

  const progressoMetaVenda = metaVendaValor > 0
    ? total.total_vendas / metaVendaValor
    : 0;
    

  const progressoMetaCompra = limiteCompraValor > 0
    ? compras.total_geral / limiteCompraValor
    : 0;

  const relacaoCompraVenda = total.total_vendas - compras.total_geral

  const cards = [
    {
      label: "Cupons",
      value: formatInt(total.total_cupons),
      explicacao: "Quantidade total de cupons emitidos.",
    },
    {
      label: "Ticket Médio",
      value: formatCurrency(total.ticket_medio),
      explicacao: "Média de valor gasto por cupom.",
    },
    {
      label: "Total de Compras",
      value: formatCurrency(compras.total_geral),
      barra: getProgressBar(progressoMetaCompra, `Limite: ${formatCurrency(limiteCompraValor)}`, true),
      explicacao: "Valor total gasto com compras no período em relação ao limite permitido.",
    },
    {
      label: "Total de Vendas",
      value: formatCurrency(total.total_vendas),
      barra: getProgressBar(progressoMetaVenda, `Meta: ${formatCurrency(metaVendaValor)}`),
      explicacao: "Soma total das vendas realizadas em relação à meta.",
    },
    {
      label: "Relação Compra e Venda",
      value: formatCurrency(relacaoCompraVenda),
      explicacao: "Relação Compra e Venda | Venda - Compra",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {cards.map((item, index) => (
        <Card key={index} className="hover:scale-105 transition-transform p-2 gap-1">
          <div className="flex items-center justify-between pr-2">
            <CardTitle className="text-base">{item.label}</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
              </PopoverTrigger>
              <PopoverContent side="top" className="text-sm w-64">
                {item.explicacao || "Sem descrição disponível"}
              </PopoverContent>
            </Popover>
          </div>
          <CardContent>
            <p className="text-xl font-semibold">{item.value}</p>
            {item.barra && item.barra}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetricCards;
