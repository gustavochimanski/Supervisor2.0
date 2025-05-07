"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PieChart } from "@mui/x-charts/PieChart";
import { PieValueType } from "@mui/x-charts/models";

interface MeioPagamentoItem {
  empresa: string;
  valorTotal: number;
}

interface Props {
  data: MeioPagamentoItem[];
}




export function ComponentMeioPagamento({ data }: Props) {

  const coresMeiosPagamento: Record<string, string> = {
    "PIX": "hsl(var(--chart-1))",
    "Crédito TEF": "hsl(var(--chart-2))",
    "Débito TEF": "hsl(var(--chart-3))",
    "Crédito POS": "hsl(var(--chart-4))",
    "Débito POS": "hsl(var(--chart-5))",
    "Dinheiro": "hsl(var(--chart-1))", // pode repetir se faltar
    "Alimentação": "hsl(var(--chart-2))",
  };
  
  // transforma o array de compras em PieValueType[]
  const chartData: PieValueType[] = data.map((item, idx) => ({
    id: idx,
    value: item.valorTotal,
    label: item.empresa,
    color: coresMeiosPagamento[item.empresa] ?? undefined,
  }));

  

  return (
    <Card className="flex flex-col flex-1 min-h-[300px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Meio de Pagamento</CardTitle>
        <CardDescription>Relaçao Entre os meios de pagamento </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="flex justify-center">
          <PieChart
            series={[{ data: chartData, highlightScope: { fade: "global", highlight: "item" } }]}
            height={200}
            sx={{ width: "100%", maxWidth: 240 }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
