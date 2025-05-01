"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// ------------------------------
// Types (matching seu response_model)
// ------------------------------
interface TypeVendaByDay {
  data: string
  valor: number
}

interface TypeVendaDetalhadaEmpresa {
  empresa: string
  dates: TypeVendaByDay[]
}

interface TypeVendaDetalhadaResponse {
  empresas: string[]
  dataInicio: string
  dataFinal: string
  vendaEmpresas: TypeVendaDetalhadaEmpresa[]
}

// ------------------------------
// Mocked data conforme os tipos
// ------------------------------
const mockVendaDetalhadaResponse: TypeVendaDetalhadaResponse = {
  empresas: ["001", "002"],
  dataInicio: "2024-04-01",
  dataFinal: "2024-04-07",
  vendaEmpresas: [
    {
      empresa: "001",
      dates: [
        { data: "2024-04-01", valor: 1234.56 },
        { data: "2024-04-02", valor: 1100.0 },
        { data: "2024-04-03", valor: 980.0 },
        { data: "2024-04-04", valor: 1400.0 },
        { data: "2024-04-05", valor: 1300.0 },
        { data: "2024-04-06", valor: 1250.0 },
        { data: "2024-04-07", valor: 1500.0 },
      ],
    },
    {
      empresa: "002",
      dates: [
        { data: "2024-04-01", valor: 800.0 },
        { data: "2024-04-02", valor: 920.0 },
        { data: "2024-04-03", valor: 760.0 },
        { data: "2024-04-04", valor: 980.0 },
        { data: "2024-04-05", valor: 1150.0 },
        { data: "2024-04-06", valor: 1000.0 },
        { data: "2024-04-07", valor: 1250.0 },
      ],
    },
    {
      empresa: "003",
      dates: [
        { data: "2024-04-01", valor: 800.0 },
        { data: "2024-04-02", valor: 920.0 },
        { data: "2024-04-03", valor: 760.0 },
        { data: "2024-04-04", valor: 980.0 },
        { data: "2024-04-05", valor: 1150.0 },
        { data: "2024-04-06", valor: 1000.0 },
        { data: "2024-04-07", valor: 1250.0 },
      ],
    },
    {
      empresa: "003",
      dates: [
        { data: "2024-04-01", valor: 800.0 },
        { data: "2024-04-02", valor: 920.0 },
        { data: "2024-04-03", valor: 760.0 },
        { data: "2024-04-04", valor: 980.0 },
        { data: "2024-04-05", valor: 1150.0 },
        { data: "2024-04-06", valor: 1000.0 },
        { data: "2024-04-07", valor: 1250.0 },
      ],
    },
    {
      empresa: "003",
      dates: [
        { data: "2024-04-01", valor: 800.0 },
        { data: "2024-04-02", valor: 920.0 },
        { data: "2024-04-03", valor: 760.0 },
        { data: "2024-04-04", valor: 980.0 },
        { data: "2024-04-05", valor: 1150.0 },
        { data: "2024-04-06", valor: 1000.0 },
        { data: "2024-04-07", valor: 1250.0 },
      ],
    },
    {
      empresa: "003",
      dates: [
        { data: "2024-04-01", valor: 800.0 },
        { data: "2024-04-02", valor: 920.0 },
        { data: "2024-04-03", valor: 760.0 },
        { data: "2024-04-04", valor: 980.0 },
        { data: "2024-04-05", valor: 1150.0 },
        { data: "2024-04-06", valor: 1000.0 },
        { data: "2024-04-07", valor: 1250.0 },
      ],
    },
  ],
}

export function ComponentChartVendas() {
  const { vendaEmpresas, dataInicio, dataFinal } = mockVendaDetalhadaResponse
  const [activeEmpresa, setActiveEmpresa] = React.useState<string>(
    vendaEmpresas[0].empresa
  )

  // Prepara os dados para o chart, filtrando pela empresa ativa
  const chartData = React.useMemo(
    () => {
      const empresaData = vendaEmpresas.find(
        (e) => e.empresa === activeEmpresa
      )
      return (
        empresaData?.dates.map((d) => ({ date: d.data, valor: d.valor })) ?? []
      )
    },
    [activeEmpresa, vendaEmpresas]
  )

  // Calcula o total de vendas no período
  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.valor, 0),
    [chartData]
  )

  // Configuração do ChartContainer
  const chartConfig: ChartConfig = {
    views: { label: "Vendas" },
    valor: { label: "Valor", color: "hsl(var(--chart-1))" },
  }

  return (
    <Card className="lg:w-1/2">
      <CardHeader className="border-b p-0">
        <div className="flex flex-col justify-between  sm:flex-row sm:items-center">
          <div className="space-y-1 m-4">
            <CardTitle>Vendas por Dia</CardTitle>
            <CardDescription>
              {`${dataInicio} até ${dataFinal}`}
            </CardDescription>
          </div>
          <div className="flex mt-auto">
            {vendaEmpresas.map(({ empresa }) => (
              <button
                key={empresa}
                data-active={activeEmpresa === empresa}
                className="rounded-md rounded-b-none hover:bg-muted px-4 py-2 text-sm font-semibold data-[active=true]:bg-muted"
                onClick={() => setActiveEmpresa(empresa)}
              >
                Empresa {empresa}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-[16/9]"
        >
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="valor"
                  labelFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey="valor"
              type="monotone"
              stroke={`var(--color-valor)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}