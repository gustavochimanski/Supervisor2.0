// src/components/ComponentChartVendas.tsx
"use client"

import * as React from "react"
import { CartesianGrid, Area, AreaChart, XAxis } from "recharts"
import { useDraggableScroll } from "@/utils/effects/useDraggableScroll"

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
import { TypeVendaDetalhadaResponse } from "../../types/typeDashboard"

export function ComponentChartVendas({
  vendaDetalhada,
}: {
  vendaDetalhada: TypeVendaDetalhadaResponse
}) {
  const { vendaEmpresas, dataInicio, dataFinal } = vendaDetalhada
  
  const [activeEmpresa, setActiveEmpresa] = React.useState<string>(
    vendaEmpresas[0].empresa
  )

  // 1) dados de vendas filtrados pela empresa ativa
  const vendasData = React.useMemo(() => {
    const empresa = vendaEmpresas.find((e) => e.empresa === activeEmpresa)
    return (
      empresa?.dates.map((d) => ({
        date: d.data,
        valor: d.valor,
      })) ?? []
    )
  }, [activeEmpresa, vendaEmpresas])

  // 2) mock de compras: mesmíssimas datas, valor aleatório pra demo
  const comprasData = React.useMemo(() => {
    return vendasData.map((d) => ({
      date: d.date,
      // ex: compras variando entre 30% e 70% do valor de venda
      compra: Math.round(d.valor * (0.3 + Math.random() * 0.4)),
    }))
  }, [vendasData])



  // 3) mescla num só array (cada item: { date, valor, compra })
  const chartData = React.useMemo(() => {
    return vendasData.map((d, i) => ({
      ...d,
      compra: comprasData[i].compra,
    }))
  }, [vendasData, comprasData])

  // Configuração de cores/labels pras duas séries
  const chartConfig: ChartConfig = {
    valor: { label: "Vendas", color: "hsl(var(--chart-1))" },
    compra: { label: "Compras", color: "hsl(var(--chart-2))" },
  }

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
  } = useDraggableScroll()

  return (
    <Card className="lg:w-1/2">
      <CardHeader className="border-b p-0">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="space-y-1 m-4 w-2/3">
            <CardTitle>Relação compra e venda</CardTitle>
            <CardDescription>
              {`${dataInicio} até ${dataFinal}`}
            </CardDescription>
          </div>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="mt-auto px-4 sm:px-0 flex gap-2 overflow-hidden cursor-grab active:cursor-grabbing select-none"
          >
            {vendaEmpresas.map(({ empresa }, idx) => (
              <button
                key={idx}
                data-active={activeEmpresa === empresa}
                className="rounded-md rounded-b-none hover:bg-muted px-4 py-2 text-sm font-semibold data-[active=true]:bg-muted whitespace-nowrap"
                onClick={() => setActiveEmpresa(empresa)}
              >
                Empresa {empresa}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 flex">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* GRÁFICO */}
    <ChartContainer config={chartConfig} className="aspect-[16/9]">
      <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
        <defs>
          <linearGradient id="gradVendas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-valor)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-valor)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradCompras" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-compra)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-compra)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(v) =>
            new Date(v).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
            })
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              nameKey="valor"
              labelFormatter={(v) =>
                new Date(v).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }
            />
          }
        />
        <Area
          dataKey="valor"
          type="natural"
          stroke="var(--color-valor)"
          fill="url(#gradVendas)"
          fillOpacity={1}
          dot={false}
        />
        <Area
          dataKey="compra"
          type="natural"
          stroke="var(--color-compra)"
          fill="url(#gradCompras)"
          fillOpacity={1}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>

    {/* TABELA (DataFrame) */}
    <div className="overflow-auto rounded-md border text-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-muted font-semibold">
          <tr>
            <th className="px-3 py-2">Data</th>
            <th className="px-3 py-2">Vendas</th>
            <th className="px-3 py-2">Compras</th>
            <th className="px-3 py-2">Lucro</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((row, idx) => (
            <tr key={idx} className="even:bg-muted/30">
              <td className="px-3 py-1">
                {new Date(row.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </td>
              <td className="px-3 py-1">R$ {row.valor.toFixed(2)}</td>
              <td className="px-3 py-1">R$ {row.compra.toFixed(2)}</td>
              <td className="px-3 py-1 font-medium">
                R$ {(row.valor - row.compra).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</CardContent>

    </Card>
  )
}
