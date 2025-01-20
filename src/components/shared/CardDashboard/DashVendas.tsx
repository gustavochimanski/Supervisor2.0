"use client"

import {  LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
const chartData = [
  { browser: "chrome", visitors: 300, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 300, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 300, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 300, fill: "var(--color-edge)" },
  { browser: "other", visitors: 300, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Campo Limpo",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Novo Lider",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Embu",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "PIX",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Dinheiro",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

// Calcular a soma total e adicionar porcentagens ao chartData
const totalVisitors = chartData.reduce((acc, item) => acc + item.visitors, 0);
const chartDataWithPercentages = chartData.map((item) => ({
  ...item,
  percentage: ((item.visitors / totalVisitors) * 100).toFixed(1), // 1 casa decimal
}));

const clickTest = () => {
  window.alert("Click")
}


export function DashBoardVendas() {
  return (
    <Card className="flex flex-col w-1/4">
    <Button  className=" w-20 rounded-bl-none" onClick={clickTest}>Detalhes</Button>
      <CardHeader className="items-center pb-0">
        <CardTitle>Vendas</CardTitle>
        <CardDescription>01/01/2025 - 17/01/2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataWithPercentages}
              dataKey="visitors"
              nameKey="browser"
              outerRadius={100}
            >
              <LabelList
                dataKey="percentage"
                position="inside"
                formatter={(value: any) => `${value}%`}
                fontSize={12}
                fill="black" // Texto branco para melhor contraste
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      
          <h1>Valor total 54,00 R$</h1>

      </CardFooter>
    </Card>
  )
}
