"use client";

import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { TypeDashboardHeader } from "../../types/typeDashboard";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info } from "lucide-react"; // ícone ℹ️

type Props = { data: TypeDashboardHeader };

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);

const formatInt = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value);

// Define a cor baseada no progresso
const getProgressColor = (percentual: number) => {
  if (percentual >= 100) return "bg-green-500";
  if (percentual >= 60) return "bg-blue-500";
  if (percentual >= 30) return "bg-yellow-500";
  return "bg-red-500";
};

// barra de progresso baseada no progresso
const getProgressBar = (progresso: number) => {
  const percentual = Math.min(Math.round(progresso * 100), 999);
  const cor = getProgressColor(percentual);

  return (
    <div className="mt-2 w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">Progresso da Meta</span>
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

// ...imports e funções auxiliares permanecem iguais

const DashboardMetricCards = ({ data }: Props) => {
  const total = data.total_geral;
  const metas = data.metas;

  const progressoMeta = metas.total_geral.valorMeta > 0
    ? total.total_vendas / metas.total_geral.valorMeta
    : 0;

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
      label: "Margem",
      value: formatCurrency(total.margem),
      explicacao: "Média de vendas por cupom (proporcional).",
    },
    {
      label: "Total de Compras",
      value: formatCurrency(total.margem),
      explicacao: "Valor total gasto com compras no período.",
    },
    {
      label: "Total de Vendas",
      value: formatCurrency(total.total_vendas),
      barra: getProgressBar(progressoMeta),
      explicacao: "Soma total das vendas realizadas.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
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
