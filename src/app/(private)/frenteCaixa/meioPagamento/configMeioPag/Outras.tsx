// OtherSettings.tsx
import React from "react";
import { ConfiguracaoMeioPag } from "../types";
import { CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CircleHelp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface OtherSettingsProps {
  configDadosMeioPgto: ConfiguracaoMeioPag[];
  handleChange: (key: keyof ConfiguracaoMeioPag, value: any, nomeCampo: string) => void;
}

// Lista de operações permitidas
const opcoesOperacoes = [
  { id: "RC", label: "Recarga Celular" },
  { id: "VG", label: "Vale-Gás" },
  { id: "PC", label: "Pagamento Contas" },
  { id: "CV", label: "Cashback Vendas" },
  { id: "CB", label: "Cartão Benefício" },
  { id: "PP", label: "Pagamento Pix" },
];

const OtherSettings: React.FC<OtherSettingsProps> = ({ configDadosMeioPgto, handleChange }) => {
  // Valores selecionados para operações permitidas
  const valoresSelecionados =
    configDadosMeioPgto.find((item) => item.nomeCampo === "OperacoesPermitidas")?.stringValue?.split(",") || [];

  // Atualiza o array de operações permitidas
  const handleCheckboxChange = (id: string) => {
    const novoValor = valoresSelecionados.includes(id)
      ? valoresSelecionados.filter((item) => item !== id)
      : [...valoresSelecionados, id];
    handleChange("stringValue", novoValor.join(","), "OperacoesPermitidas");
  };

  return (
    <div>
      <CardTitle className="ml-3 text-base flex w-full">Outros</CardTitle>
      <div className="flex flex-wrap gap-2 justify-center md:justify-normal">
        {/* Aciona Gaveta */}
        <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28">
          <div className="flex">
            <label htmlFor="AcionaGaveta" className="block whitespace-nowrap p-1">
              Aciona Gaveta
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Aciona Gaveta</u> - </strong> Indica se o meio de pagamento deve acionar a gaveta.
              </PopoverContent>
            </Popover>
          </div>
          <Select
            value={configDadosMeioPgto.find((item) => item.nomeCampo === "AcionaGaveta")?.stringValue ?? ""}
            onValueChange={(value) => handleChange("stringValue", value, "AcionaGaveta")}
          >
            <SelectTrigger id="AcionaGaveta">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Sim</SelectItem>
              <SelectItem value="N">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Operações Permitidas */}
        <div className="flex flex-col mx-3 w-full justify-center md:w-28">
          <div className="flex">
            <label htmlFor="OperacoesPermitidas" className="block whitespace-nowrap p-1">
              Operações Permitidas
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Opções Extras</u> - </strong> Configure operações adicionais que o PDV pode realizar.
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid md:grid-rows-1 md:grid-flow-col gap-x-4 gap-y-2 mt-2">
            {opcoesOperacoes.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={valoresSelecionados.includes(option.id)}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer select-none">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OtherSettings;
