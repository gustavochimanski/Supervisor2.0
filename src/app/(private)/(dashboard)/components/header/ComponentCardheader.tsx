"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import { CalendarIcon, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TypeFiltroRelatorio } from "../../types/typeDashboard";

// -----------------------------------------------------------------------------
// Constantes utilitárias
// -----------------------------------------------------------------------------
const TODAS_EMPRESAS = ["001", "002", "003", "004", "005"] as const;

const formatDateISO = (d: Date) => format(d, "yyyy-MM-dd");
const formatDisplayDate = (d: Date) =>
  `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;

// -----------------------------------------------------------------------------
// Zod + RHF Schema
// -----------------------------------------------------------------------------
const schema = z
  .object({
    empresas: z.array(z.string()),
    dataInicial: z.date(),
    dataFinal: z.date(),
  })
  .refine((v) => v.dataFinal >= v.dataInicial, {
    path: ["dataFinal"],
    message: "Data final não pode ser anterior à inicial",
  });

export type FormFiltro = z.infer<typeof schema>;

// -----------------------------------------------------------------------------
// Componente
// -----------------------------------------------------------------------------
interface Props {
  initialPayload: TypeFiltroRelatorio;
  onChangePayload: (p: TypeFiltroRelatorio) => void;
}

export default function ComponentCardHeader({
  initialPayload,
  onChangePayload,
}: Props) {
  const isMobile = useIsMobile();

  // ---------------------------------------------------------------------------
  // React‑Hook‑Form
  // ---------------------------------------------------------------------------
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFiltro>({
    defaultValues: {
      empresas:
        initialPayload.empresas.length === TODAS_EMPRESAS.length
          ? [...TODAS_EMPRESAS]
          : initialPayload.empresas,
      dataInicial: new Date(initialPayload.dataInicio),
      dataFinal: new Date(initialPayload.dataFinal),
    },
    resolver: zodResolver(schema),
  });

  const submit = (data: FormFiltro) => {
    onChangePayload({
      empresas: data.empresas,
      dataInicio: formatDateISO(data.dataInicial),
      dataFinal: formatDateISO(data.dataFinal),
    });
  };

  // ---------------------------------------------------------------------------
  // Helpers de UI
  // ---------------------------------------------------------------------------
  const parseInput = (str: string): Date | null => {
    const [dd, mm, yyyy] = str.split("/");
    const date = new Date(+yyyy, +mm - 1, +dd);
    return isNaN(date.getTime()) ? null : date;
  };

  const buildEmpresaSelectValue = (empresas: string[]) => {
    if (empresas.length === TODAS_EMPRESAS.length) return "Todas";
    return empresas[0] ?? "__vazio__";
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit(submit)}>
      <CardHeader className="flex flex-row justify-between p-1 bg-primary/90 rounded-t-[var(--radius)] font-sans">
        {!isMobile && (
          <CardTitle className="text-white m-2">Dashboard</CardTitle>
        )}


        <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-2 pb-1 text-sm">
          {/* ------------------------- Empresa Select ------------------------- */}
          <Controller
            name="empresas"
            control={control}
            render={({ field }) => {
              const selectValue = buildEmpresaSelectValue(field.value);
              return (
                <div className="flex mt-auto ">
                  <div className="flex items-center bg-border rounded-l h-7 text-xs font-semibold px-3">
                    <Label className="pointer-events-none select-none">
                      Empresa
                    </Label>
                  </div>

                  <div></div>
                  <Select
                    value={selectValue}
                    onValueChange={(valor) => {
                      if (valor === "Todas") field.onChange([...TODAS_EMPRESAS]);
                      else if (valor === "__vazio__") field.onChange([]);
                      else field.onChange([valor]);
                    }}
                  >
                    <SelectTrigger className="-7 bg-background text-center rounded-l-none border-none shadow-none">
                      <SelectValue placeholder="Selecione…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__vazio__">Selecione…</SelectItem>
                      <SelectItem value="Todas">Todas</SelectItem>
                      {TODAS_EMPRESAS.map((cod) => (
                        <SelectItem key={cod} value={cod}>
                          {cod}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />


        {isMobile && (
          <Button
              type="submit"
              className="h-7 bg-background hover:bg-background/60 mt-auto"
            >
            <Search className="mr-1 h-4 w-4 text-foreground" />
            <span className="text-foreground">Buscar</span>
          </Button>
          )}


          {/* -------------------------- Data Inicial -------------------------- */}
          <Controller
            name="dataInicial"
            control={control}
            render={({ field }) => (
              <div className="flex mt-auto text-center">
                <div className="flex items-center bg-border rounded-l h-7 text-xs font-semibold px-3">
                  <Label className="pointer-events-none select-none">
                    Data Inicial
                  </Label>
                </div>

                <div className="flex gap-2 ">
                  <Input
                    value={formatDisplayDate(field.value)}
                    onChange={(e) => {
                      const d = parseInput(e.target.value);
                      if (d) field.onChange(d);
                    }}
                    className="h-7 bg-background text-center rounded-l-none border-none shadow-none"
                    placeholder="DD/MM/AAAA"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-7">
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(d) => d && field.onChange(d)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          />

          {/* -------------------------- Data Final --------------------------- */}
          <Controller
            name="dataFinal"
            control={control}
            render={({ field }) => (
              <div className="flex mt-auto text-center">
                <div className="flex items-center bg-border rounded-l h-7 text-xs font-semibold px-3">
                  <Label className="pointer-events-none select-none">
                    Data Final
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    value={formatDisplayDate(field.value)}
                    onChange={(e) => {
                      const d = parseInput(e.target.value);
                      if (d) field.onChange(d);
                    }}
                    className="h-7 bg-background text-center rounded-l-none border-none shadow-none"
                    placeholder="DD/MM/AAAA"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-7">
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(d) => d && field.onChange(d)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {errors.dataFinal && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.dataFinal.message}
                  </span>
                )}
              </div>
            )}
          />

          {/* ---------------------------- Botão ----------------------------- */}
          {!isMobile&& (
              <Button
              type="submit"
              className="h-7 bg-background hover:bg-background/60 mt-auto"
            >
              <Search className="mr-1 h-4 w-4 text-foreground" />
              <span className="text-foreground">Buscar</span>
            </Button>
          )}
        </div>
      </CardHeader>
    </form>
  );
}
