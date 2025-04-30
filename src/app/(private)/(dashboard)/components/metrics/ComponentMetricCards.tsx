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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";


type Props = { data: TypeDashboardHeader };

// Cores normais para progresso positivo
const getProgressColor = (percentual: number) => {
  if (percentual >= 100) return "bg-green-500";
  if (percentual >= 60) return "bg-blue-500";
  if (percentual >= 30) return "bg-yellow-500";
  return "bg-red-500";
};

// Cores invertidas para metas negativas
const getProgressColorInverted = (percentual: number) => {
  if (percentual >= 95) return "bg-red-500";
  if (percentual >= 70) return "bg-yellow-500";
  if (percentual >= 40) return "bg-blue-500";
  return "bg-green-500";
};

// Cores normais para progresso positivo
const getProgressColorLucro = (percentual: number) => {
  if (percentual >= 35) return "bg-green-500";
  if (percentual >= 25) return "bg-blue-500";
  if (percentual >= 15) return "bg-yellow-500";
  return "bg-red-500";
};

// Barra de progresso
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
const getProgressValue = (metas: TotaisGeraisMeta[], tipo: TotaisGeraisMeta["tipo"]) => {
  return metas.find((meta) => meta.tipo === tipo)?.valorMeta ?? 0;
};

const DashboardMetricCards = ({ data }: Props) => {
  const total = data.total_geral;
  const metas = data.metas;
  const compras = data.compras;
  const relacao = data.relacao;

  const metaVendaValor = getProgressValue(metas.total_geral, "metaVenda");
  const limiteCompraValor = getProgressValue(metas.total_geral, "limiteCompra");

  const progressoMetaVenda = metaVendaValor > 0 ? total.total_vendas / metaVendaValor : 0;
  const progressoMetaCompra = limiteCompraValor > 0 ? compras.total_geral / limiteCompraValor : 0;
  const progressoRelacao = relacao.relacaoPorcentagem > 0 ? relacao.relacaoPorcentagem / 100 : 0;

  const cards = [
    {
      label: "Total de Vendas",
      value: formatCurrency(total.total_vendas),
      barra: getProgressBar(progressoMetaVenda, `Meta: ${formatCurrency(metaVendaValor)}`),
      explicacao: "Soma total das vendas realizadas em relação à meta.",
      gradientFrom: "from-indigo-700",
      gradientTo: "to-indigo-300",
    },
    {
      label: "Total de Compras",
      value: formatCurrency(compras.total_geral),
      barra: getProgressBar(progressoMetaCompra, `Limite: ${formatCurrency(limiteCompraValor)}`, true),
      explicacao: "Valor total gasto com compras no período em relação ao limite permitido.",
      gradientFrom: "from-red-700",
      gradientTo: "to-red-300",
    },
    {
      label: "Lucro Bruto",
      value: formatCurrency(relacao.relacaoValue),
      explicacao: "Relação Compra e Venda | Venda - Compra",
      barra: getProgressBar(progressoRelacao, `${relacao.relacaoPorcentagem.toPrecision(4)} %`),
      gradientFrom: relacao.relacaoValue >= 0 ? "from-green-700" : "from-red-700",
      gradientTo: relacao.relacaoValue >= 0 ? "to-green-300" : "to-red-300",
    },
    {
      label: "Cupons",
      explicacao: "Quantidade de cupons emitidos e o ticket médio (valor médio por cupom).",
      subvalores: [
        { label: "Quantidade", value1: formatInt(total.total_cupons) },
        { label: "Ticket Médio", value1: formatCurrency(total.ticket_medio) },
        { label: "Ticket Máximo", value1: 649.99 },
      ],
      gradientFrom: "from-indigo-700",
      gradientTo: "to-indigo-300",
    },
    {
      label: "Pdvs",
      explicacao:
        "⚠️ Atenção: Se algum PDV estiver offline, as vendas registradas nele não serão enviadas para o sistema até que a conexão seja restabelecida.",
      subvalores: [
        {
          label: "Conectado",
          value1: 25,
          value2: <span className="inline-block w-3 h-3 rounded-full bg-green-700" />,
        },
        {
          label: "Operando",
          value1: 15,
          value2: <span className="inline-block w-3 h-3 rounded-full bg-indigo-700" />,
        },
        {
          label: "Offline",
          value1: 2,
          value2: <span className="inline-block w-3 h-3 rounded-full bg-red-700" />,
        },
      ],
      gradientFrom: "from-indigo-700",
      gradientTo: "to-indigo-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 flex-1">
      {cards.map((item, index) => (
        <Card key={index} className="relative overflow-hidden hover:scale-105 transition-transform p-2 gap-1">
          {/* Linha de degradê no topo */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo}`} />
          <div className="flex items-center justify-between pr-2">
            <CardTitle className="text-base font-semibold">{item.label}</CardTitle>
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
            {item.subvalores ? (
              <Table>
                <TableBody>
                  {item.subvalores.map((sub, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium p-1">{sub.label}</TableCell>
                      <TableCell className="p-1 text-right">{sub.value1}</TableCell>
                      <TableCell className="p-1 text-right">{sub.value2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <>
                <p className="text-xl font-semibold">{item.value}</p>
                {item.barra && item.barra}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetricCards;
