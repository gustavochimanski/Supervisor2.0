// SangriaSettings.tsx
import React from "react";
import { ConfiguracaoMeioPag } from "../types";
import { CardTitle } from "@/components/ui/card";
import { FloatInput } from "@/components/shared/floatInput";
import { IntegerInput } from "@/components/shared/integerInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CircleHelp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SangriaSettingsProps {
  configDadosMeioPgto: ConfiguracaoMeioPag[];
  handleChange: (key: keyof ConfiguracaoMeioPag, value: any, nomeCampo: string) => void;
}

const SangriaSettings: React.FC<SangriaSettingsProps> = ({ configDadosMeioPgto, handleChange }) => {
  return (
    <div>
      <CardTitle className="ml-3 text-base flex w-full">Sangrias</CardTitle>
      <div className="flex flex-wrap gap-2 justify-center md:justify-normal">
        {/* Efetuar Sangria */}
        <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32">
          <div className="flex">
            <label htmlFor="EfetuarSangria" className="block whitespace-nowrap p-1">
              Efetua Sangria
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Efetua Sangria</u> - </strong> Selecione se o PDV deve realizar a sangria.
              </PopoverContent>
            </Popover>
          </div>
          <Select
            value={configDadosMeioPgto.find((item) => item.nomeCampo === "EfetuarSangria")?.stringValue ?? ""}
            onValueChange={(value) => handleChange("stringValue", value, "EfetuarSangria")}
          >
            <SelectTrigger id="EfetuarSangria">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Sim</SelectItem>
              <SelectItem value="N">Não</SelectItem>
              <SelectItem value="F">Fechamento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Vias Sangria */}
        <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28">
          <div className="flex">
            <label htmlFor="ViasSangria" className="block whitespace-nowrap p-1">
              Vias Sangria
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Número de Vias</u> - </strong> Defina quantas cópias do comprovante serão impressas.
              </PopoverContent>
            </Popover>
          </div>
          <IntegerInput
            value={configDadosMeioPgto.find((item) => item.nomeCampo === "ViasSangria")?.integerValue ?? 0}
            onChange={(value) => handleChange("integerValue", value, "ViasSangria")}
          />
        </div>
        {/* Tipo Sangria */}
        <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32">
          <div className="flex">
            <label htmlFor="TipoSangria" className="block whitespace-nowrap p-1">
              Tipo Sangria
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Tipo Sangria</u> - </strong> Defina o tipo de sangria.
              </PopoverContent>
            </Popover>
          </div>
          <Select
            value={configDadosMeioPgto.find((item) => item.nomeCampo === "TipoSangria")?.stringValue ?? ""}
            onValueChange={(value) => handleChange("stringValue", value, "TipoSangria")}
          >
            <SelectTrigger id="TipoSangria">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="C">Opção C</SelectItem>
              <SelectItem value="D">Opção D</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Tipo Coleta Sangria */}
        <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32">
          <div className="flex">
            <label htmlFor="TipoSangriaFecham" className="block whitespace-nowrap p-1">
              Tipo Coleta
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Tipo Coleta Sangria</u> - </strong> Defina o método de coleta.
              </PopoverContent>
            </Popover>
          </div>
          <Select
            value={configDadosMeioPgto.find((item) => item.nomeCampo === "TipoSangriaFecham")?.stringValue ?? ""}
            onValueChange={(value) => handleChange("stringValue", value, "TipoSangriaFecham")}
          >
            <SelectTrigger id="TipoSangriaFecham">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="G">Efetua sangria do saldo</SelectItem>
              <SelectItem value="I">Informa valor para sangria</SelectItem>
              <SelectItem value="C">Valor configurado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Valor Aviso Sangria */}
        <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28">
          <div className="flex">
            <label htmlFor="ValorAvisoSangria" className="block whitespace-nowrap p-1">
              Valor Aviso
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Valor Aviso Sangria</u> - </strong> Defina o valor limite para aviso.
              </PopoverContent>
            </Popover>
          </div>
          <FloatInput
            value={configDadosMeioPgto.find((item) => item.nomeCampo === "ValorAvisoSangria")?.doubleValue ?? 0}
            onChangeValue={(value: number) => handleChange("doubleValue", value, "ValorAvisoSangria")}
          />
        </div>
        {/* Valor Bloqueio Sangria */}
        <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28">
          <div className="flex">
            <label htmlFor="ValorBloqSangria" className="block whitespace-nowrap p-1">
              Valor Bloq
            </label>
            <Popover>
              <PopoverTrigger><CircleHelp size={13} /></PopoverTrigger>
              <PopoverContent>
                <strong><u>Valor Bloqueio Sangria</u> - </strong> Defina o valor que bloqueará o caixa.
              </PopoverContent>
            </Popover>
          </div>
          <FloatInput
            value={configDadosMeioPgto.find((item) => item.nomeCampo === "ValorBloqSangria")?.doubleValue ?? 0}
            onChangeValue={(value: number) => handleChange("doubleValue", value, "ValorBloqSangria")}
          />
        </div>
      </div>
      
    </div>
  );
};

export default SangriaSettings;
