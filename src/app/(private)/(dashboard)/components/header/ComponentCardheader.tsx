/* components/dashboard/ComponentCardHeader.tsx */
"use client"

import { useEffect, useState } from "react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { usePostHeaderDashboard } from "../../hooks/useCardHeader"
import {
  TypeDashboardHeader,
  TypeFiltroRelatorio,
} from "../../types/typeCardHeader"

const formatDate = (d: Date) => d.toISOString().slice(0, 10)
const formatDisplayDate = (d: Date) =>
  `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`

type Props = {
  payload: TypeFiltroRelatorio
  onDataReceived?: (d: TypeDashboardHeader) => void
}

const ComponentCardHeader = ({ payload, onDataReceived }: Props) => {
  const { mutate, isLoading, data: dataDashboard, isSuccess, isError } = usePostHeaderDashboard()

  /* estados controlados pelo usuário */
  const [currentPayload, setCurrentPayload] =
    useState<TypeFiltroRelatorio>(payload)
  const [empresaInput, setEmpresaInput] = useState(
    (payload as any).empresa ?? ""
  )
  const [startDateInput, setStartDateInput] = useState(
    formatDisplayDate(new Date(payload.dataInicial))
  )
  const [endDateInput, setEndDateInput] = useState(
    formatDisplayDate(new Date(payload.dataFinal))
  )

  /* sincroniza e faz a primeira chamada */
  useEffect(() => {
    setCurrentPayload(payload)
    setEmpresaInput((payload as any).empresa ?? "")
    setStartDateInput(formatDisplayDate(new Date(payload.dataInicial)))
    setEndDateInput(formatDisplayDate(new Date(payload.dataFinal)))
    mutate(payload)
  }, [])

  useEffect(() => {
    if (isSuccess && dataDashboard) onDataReceived?.(dataDashboard)
  }, [isSuccess, dataDashboard, onDataReceived])

  useEffect(() => {
    if (isError) console.error("Erro ao buscar header dashboard")
  }, [isError])

  /* handlers */
  const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmpresaInput(value)
    setCurrentPayload({ ...currentPayload, empresa: value } as any)
  }

  const handleStartDateSelect = (d?: Date) => {
    if (!d) return
    const iso = formatDate(d)
    const newPayload = {
      ...currentPayload,
      dataInicial: iso,
      dataFinal:
        currentPayload.dataFinal === currentPayload.dataInicial
          ? iso
          : currentPayload.dataFinal,
    }
    setCurrentPayload(newPayload)
    setStartDateInput(formatDisplayDate(d))
    if (currentPayload.dataFinal === currentPayload.dataInicial)
      setEndDateInput(formatDisplayDate(d))
  }

  const handleEndDateSelect = (d?: Date) => {
    if (!d) return
    const iso = formatDate(d)
    setCurrentPayload({ ...currentPayload, dataFinal: iso })
    setEndDateInput(formatDisplayDate(d))
  }

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartDateInput(e.target.value)
  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEndDateInput(e.target.value)

  const handleSearch = () => mutate(currentPayload)

  return (
    <div className="bg-primary/90 rounded-t-[var(--radius)] font-sans">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-1">
        <CardTitle className="m-4 text-white">Dashboard</CardTitle>

        <div className="flex flex-row flex-wrap items-end gap-4 text-sm">
          {/* Empresa */}
          <div className="flex flex-col gap-1">
            <Label className="text-white">Empresa</Label>
            <Input
              value={empresaInput}
              onChange={handleEmpresaChange}
              className="h-7 bg-background"
              placeholder="Nome ou código"
            />
          </div>

          {/* Data Inicial */}
          <div className="flex flex-col gap-1">
            <Label className="text-white">Data Inicial</Label>
            <div className="flex items-center gap-4">
              <Input
                value={startDateInput}
                onChange={handleStartInputChange}
                className="h-7 bg-background"
                placeholder="DD/MM/AAAA"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(currentPayload.dataInicial)}
                    onSelect={handleStartDateSelect}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Data Final */}
          <div className="flex flex-col gap-1">
            <Label className="text-white">Data Final</Label>
            <div className="flex items-center gap-4">
              <Input
                value={endDateInput}
                onChange={handleEndInputChange}
                className="h-7 bg-background"
                placeholder="DD/MM/AAAA"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(currentPayload.dataFinal)}
                    onSelect={handleEndDateSelect}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Botão Buscar */}
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="mx-4 mt-auto"
            variant="outline"
          >
            <Search className="mr-1 h-4 w-4" />Buscar
          </Button>
        </div>
      </CardHeader>
    </div>
  )
}

export default ComponentCardHeader