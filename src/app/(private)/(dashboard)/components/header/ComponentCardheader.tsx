"use client";

import { useState } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { TypeFiltroRelatorio } from "../../types/typeCardHeader";

const formatDate = (d: Date) => d.toISOString().slice(0, 10);
const formatDisplayDate = (d: Date) =>
  `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;

// Recebemos somente a callback para comunicar o payload ao pai, de forma opcional
type Props = {
  onChangePayload: (payload: TypeFiltroRelatorio) => void;
};

export default function ComponentCardHeader({ onChangePayload }: Props) {
  const isMobile = useIsMobile();

  // Estado interno
  const [empresa, setEmpresa] = useState("001");
  const [dataInicial, setDataInicial] = useState<Date>(new Date());
  const [dataFinal, setDataFinal] = useState<Date>(new Date());

  // Inputs de texto para exibir data dd/mm/aaaa
  const [startDateInput, setStartDateInput] = useState(formatDisplayDate(dataInicial));
  const [endDateInput, setEndDateInput] = useState(formatDisplayDate(dataFinal));

  // Somente enviamos o payload ao pai quando clicamos em "Buscar"
  const handleSearch = () => {
    const payload: TypeFiltroRelatorio = {
      empresa,
      dataInicial: formatDate(dataInicial),
      dataFinal: formatDate(dataFinal),
    };
    onChangePayload(payload);
  };

  // Ao digitar na input da empresa
  const handleEmpresaChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmpresa(evt.target.value);
  };

  // Seleciona data inicial no calendário -> forçamos dataFinal = dataInicial
  const handleStartDateSelect = (selected?: Date) => {
    if (!selected) return;
    setDataInicial(selected);
    setStartDateInput(formatDisplayDate(selected));

    // Sincroniza dataFinal igual à dataInicial
    setDataFinal(selected);
    setEndDateInput(formatDisplayDate(selected));
  };

  // Seleciona data final no calendário
  const handleEndDateSelect = (d?: Date) => {
    if (!d) return;
    setDataFinal(d);
    setEndDateInput(formatDisplayDate(d));
  };

  return (
    <div className="bg-primary/90 rounded-t-[var(--radius)] font-sans">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-2 px-2">
        {!isMobile && (
          <CardTitle className="m-4 text-white">Dashboard</CardTitle>
        )}

        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-2 p-2 md:p-0 text-sm">
          {/* Empresa */}
          <div className="flex flex-col">
            <Label className="text-white text-xs font-semibold">Empresa</Label>
            <div className="flex items-center gap-4">
              <Input
                value={empresa}
                onChange={handleEmpresaChange}
                className="h-7 bg-background"
                placeholder="Nome ou código"
              />
            </div>
          </div>

          {/* Botão Buscar (aparece no mobile) */}
          {isMobile && (
            <Button
              onClick={handleSearch}
              className="mt-auto h-7"
              variant="outline"
            >
              <Search />
              Buscar
            </Button>
          )}

          {/* Data Inicial */}
          <div className="flex flex-col">
            <Label className="text-white text-xs font-semibold pl-1">
              Data Inicial
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={startDateInput}
                onChange={(e) => setStartDateInput(e.target.value)}
                className="h-7 bg-background text-center"
                placeholder="DD/MM/AAAA"
              />
              <Popover>
                <PopoverTrigger asChild className="h-7">
                  <Button variant="outline">
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={dataInicial}
                    onSelect={handleStartDateSelect}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Data Final */}
          <div className="flex flex-col">
            <Label className="text-white text-xs font-semibold pl-1">
              Data Final
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={endDateInput}
                onChange={(e) => setEndDateInput(e.target.value)}
                className="h-7 bg-background text-center"
                placeholder="DD/MM/AAAA"
              />
              <Popover>
                <PopoverTrigger asChild className="h-7">
                  <Button variant="outline">
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={dataFinal}
                    onSelect={handleEndDateSelect}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Botão Buscar (aparece em telas maiores) */}
          {!isMobile && (
            <Button
              onClick={handleSearch}
              className="h-7 mt-auto bg-background hover:bg-background/60"
            >
              <Search className="mr-1 h-4 w-4 text-foreground" />
              <span className="text-foreground">Buscar</span>
            </Button>
          )}
        </div>
      </CardHeader>
    </div>
  );
}