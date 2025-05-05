// ChartComponent.tsx
"use client";

import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { mockVendasPorHora } from "./mockData";

const data = mockVendasPorHora[0].vendasPorHora.map((item, index) => ({
  hora: `${item.hora}h`,
  total_vendas: item.total_vendas,
  total_cupons: item.total_cupons,
  ticket_medio: item.ticket_medio,
}));

const chartConfig: ChartConfig = {
  total_vendas: {
    label: "Total Vendas",
    color: "hsl(var(--chart-1))",
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { total_vendas, total_cupons, ticket_medio } = payload[0].payload;
    return (
      <div className="rounded-md border bg-background p-2 shadow-sm">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs">Cupons: {total_cupons}</p>
        <p className="text-xs">Vendas: R$ {total_vendas.toFixed(2)}</p>
        <p className="text-xs">Ticket médio: R$ {ticket_medio.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export function VendasPorHoraChart() {
  return (
    <Card className="md:w-1/2">
      <CardHeader>
        <CardTitle>Vendas por Hora</CardTitle>
        <CardDescription>
          Comparativo de vendas por hora entre empresas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hora"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <defs>
              <linearGradient id="fill001" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#fill001)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Crescimento visível nas primeiras horas
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Entre 7h e 21h
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}