"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Débito",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Crédito",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "POS",
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

export function DashboardMeioPagamento() {
  return (
    <Card className="w-1/4 ">
      <Button className=" w-20 rounded-bl-none">Detalhes</Button>
      <CardHeader>
        <CardTitle>Meios de Pagamento</CardTitle>
        <CardDescription>Vendas do Periodo de Janeiro </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              width={60}
      
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Vendas <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Cartão de Débito ocupa 54% das suas Vendas
        </div>
      </CardFooter>
    </Card>
  )
}
