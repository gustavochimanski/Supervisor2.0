  "use client";

  import React, { useImperativeHandle, useState, forwardRef } from "react";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { CardContent } from "@/components/ui/card";
  import { configMap } from "./entities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

  const ConfigsMeioPagamento = forwardRef((_, ref) => {
    const [configValues, setConfigValues] = useState<Record<string | number, any>>({});

    const handleInputChange = (configId: number, value: any) => {
      setConfigValues((prev) => ({
        ...prev,
        [configId]: value,
      }));
    };

    const handleSubmit = () => {
      console.log("Dados do formulário:", configValues);
    };

    // Expor o método de submissão para o componente pai
    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));
    return (
      <form className="space-y-6">
        {/* ============== FORMULÁRIO ============== */}
        <CardContent className="flex flex-wrap gap-4 justify-center items-center">
          {configMap.map((config) => (
            <div key={config.id} className="w-full md:w-1/2 lg:w-1/3 mx-6 mt-4">
              <Label
                htmlFor={`config-${config.id}`}
                className="block text-sm ml-1 p-1 "
              >
                {config.label}
              </Label>

              {config.allowCustomValue ? (
                <Select
                  key={config.id}
                  value={configValues[config.id] || ""}
                  onValueChange={(value) => handleInputChange(config.id, value)}
                >
                  <SelectTrigger id={`config-${config.id}`} className="w-32 mx-2 h-8">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {config.options.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={`input-${config.id}`}
                  value={configValues[config.id] || ""}
                  placeholder={`Digite o valor para ${config.label}`}
                  onChange={(e) =>
                    handleInputChange(config.id, e.target.value)
                  }
                  className="block w-full p-2 border rounded"
                />
              )}
            </div>
          ))}
        </CardContent>

      </form>
    );
  });

  ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

  export default ConfigsMeioPagamento;
