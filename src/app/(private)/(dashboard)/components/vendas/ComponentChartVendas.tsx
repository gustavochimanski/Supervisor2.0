// components/vendas/ComponentChartVendas.tsx
"use client";
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip } from "recharts";
import { TypeVendaPorHoraResponse } from "../../types/typeVendasPorHora";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  data: TypeVendaPorHoraResponse[];
}

export function VendasPorHoraChart({ data }: Props) {
  // concatena todas as empresas num único dataset
  const flatData = data.flatMap((e) =>
    e.vendasPorHora.map((p) => ({
      hora: `${p.hora.toString().padStart(2, "0")}:00`,
      total_vendas: p.total_vendas,
      total_cupons: p.total_cupons,
      ticket_medio: p.ticket_medio,
      empresa: e.empresa,
    }))
  );

  return (
    <Card className="md:w-1/2">
      {/* …Header… */}
      <CardContent>
        <AreaChart data={flatData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="hora" tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip 
            formatter={(value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          />
          <Area dataKey="total_vendas" type="monotone" />
        </AreaChart>
      </CardContent>
    </Card>
  );
}
