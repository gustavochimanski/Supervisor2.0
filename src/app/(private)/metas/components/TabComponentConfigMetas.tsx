"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const TabComponentConfigMetas = () => {
  const [dataInicio, setDataInicio] = useState<Date | undefined>();
  const [dataFinal, setDataFinal] = useState<Date | undefined>();
  const [valorMeta, setValorMeta] = useState("");

  const handleSalvar = () => {
    if (!dataInicio || !dataFinal || !valorMeta) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }
    console.log({
      dataInicio,
      dataFinal,
      valorMeta: parseFloat(valorMeta.replace(",", ".")),
    });
    // aqui você pode chamar um mutate do React Query ou API
  };

  return (
    <div className="flex-1 h-full">
      <CardHeader>
        <CardTitle>Configurações de Metas</CardTitle>
        <CardDescription>Defina o período e o valor da meta a ser alcançada.</CardDescription>
      </CardHeader>

      <CardContent className="mx-4 flex gap-4">
        <div>
          <Label>Data de Início</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Input readOnly value={dataInicio?.toLocaleDateString() || ""} />
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" selected={dataInicio} onSelect={setDataInicio} />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Data Final</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Input readOnly value={dataFinal?.toLocaleDateString() || ""} />
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" selected={dataFinal} onSelect={setDataFinal} />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Valor da Meta</Label>
          <Input
            type="text"
            value={valorMeta}
            onChange={(e) => setValorMeta(e.target.value)}
            placeholder="Ex: 100000,00"
            />
        </div>
        <Button onClick={handleSalvar} className="mt-auto">
            Salvar
        </Button>
      </CardContent>

    </div>
  );
};

export default TabComponentConfigMetas;
