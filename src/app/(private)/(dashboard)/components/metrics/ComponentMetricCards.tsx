/* components/dashboard/DashboardMetricCards.tsx */
"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DollarSign,
  Percent,
  ShoppingCart,
  Ticket,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TypeDashboardHeader } from "../../types/typeCardHeader"

type Props = { data: TypeDashboardHeader }

type Metric = {
  label: string
  value: string | number
  icon: React.ElementType
  color: string
  kind: "currency" | "int"
}

const formatValue = (raw: string | number, kind: "currency" | "int") => {
  const num = typeof raw === "number" ? raw : Number(raw)

  if (kind === "currency") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(num)
  }

  return new Intl.NumberFormat("pt-BR").format(num)
}

const DashboardMetricCards = ({ data }: Props) => {
  const metrics: Metric[] = [
    {
      label: "Ticket Médio",
      value: data.ticket_medio,
      icon: Ticket,
      color: "from-indigo-400 to-indigo-600",
      kind: "currency",
    },
    {
      label: "Total Cupons",
      value: data.total_cupons,
      icon: Percent,
      color: "from-indigo-400 to-indigo-600",
      kind: "int",
    },
    {
      label: "Total Vendas",
      value: data.total_vendas,
      icon: ShoppingCart,
      color: "from-indigo-400 to-indigo-600",
      kind: "currency",
    },
    {
      label: "Meta",
      value: data.total_descontos,
      icon: DollarSign,
      color: "from-indigo-400 to-indigo-600",
      kind: "currency",
    },
    {
      label: "Total Descontos",
      value: data.total_descontos,
      icon: DollarSign,
      color: "from-indigo-400 to-indigo-600",
      kind: "currency",
    },
    {
      label: "Total Descontos",
      value: data.total_descontos,
      icon: DollarSign,
      color: "from-indigo-400 to-indigo-600",
      kind: "currency",
    },
  ]

  return (
    <div className="md:flex md:flex-row grid grid-cols-2 gap-4">
      {metrics.map(({ label, value, icon: Icon, color, kind }) => (
        <Card
          key={label}
          className={cn(
            "relative overflow-hidden transition-shadow hover:shadow-lg w-full",
          )}
        >
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-1 rounded-b-full",
              `bg-gradient-to-r ${color}`
            )}
          />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon
              size={18}
              className="text-muted-foreground/60"
              aria-hidden="true"
            />
          </CardHeader>

          <CardContent className="text-3xl mx-4 font-semibold tracking-tight">
            {formatValue(value, kind)}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default DashboardMetricCards