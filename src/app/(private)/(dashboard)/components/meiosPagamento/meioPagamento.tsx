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
  // transforma o array de compras em PieValueType[]
  const chartData: PieValueType[] = data.map((item, idx) => ({
    id: idx,
    value: item.valorTotal,
    label: item.empresa,
    // remove a cor fixa ou gere dinamicamente
  }));

  return (
    <Card className="flex flex-col flex-1 min-h-[300px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Meio de Pagamento</CardTitle>
        <CardDescription>–</CardDescription>
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
