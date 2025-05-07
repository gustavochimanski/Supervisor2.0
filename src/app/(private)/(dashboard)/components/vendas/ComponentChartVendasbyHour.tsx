"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { TypeVendaPorHoraResponse } from "../../types/typeVendasPorHora";

interface Props {
  data: TypeVendaPorHoraResponse[];
  empresaSelecionada: string;
}

export function VendasPorHoraChart({ data, empresaSelecionada }: Props) {
  const empresaData = data.find(
    (e) => String(e.empresa) === String(empresaSelecionada)
  );

  if (!empresaData) {
    return <p>Nenhum dado encontrado para a empresa {empresaSelecionada}.</p>;
  }

  const chartData = empresaData.vendasPorHora.map((v) => ({
    hora: `${v.hora.toString().padStart(2, "0")}:00`,
    total_vendas: v.total_vendas,
  }));

  const chartConfig = {
    total_vendas: {
      label: "Total de Vendas",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="md:w-1/2 ">
      <CardHeader>
        <CardTitle>Total de Vendas por Hora</CardTitle>
        <CardDescription>Empresa: {empresaSelecionada}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="hora"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />

              <defs>
                <linearGradient id="fillTotalVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-total_vendas)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-total_vendas)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="total_vendas"
                type="monotone"
                stroke="var(--color-total_vendas)"
                fill="url(#fillTotalVendas)"
                name="Total de Vendas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tendência horária <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              {chartData[0]?.hora} até {chartData.at(-1)?.hora}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
