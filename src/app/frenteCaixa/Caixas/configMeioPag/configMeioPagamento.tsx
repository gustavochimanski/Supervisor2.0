"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent } from "@/components/ui/card";
import { configMap } from "./entities";

const ConfigsMeioPagamento = () => {
  const [configValues, setConfigValues] = useState<Record<number, any>>({});

  const handleInputChange = (configId: number, value: any) => {
    setConfigValues((prev) => ({
      ...prev,
      [configId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", configValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardContent>
        {configMap.map((config) => (
          <div key={config.id} className="mb-4">
            {/* Label */}
            <label
              htmlFor={`config-${config.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              {config.label}
            </label>

            {/* Select */}
            <Select
              value={configValues[config.id] || ""}
              onValueChange={(value) => handleInputChange(config.id, value)}
            >
              <SelectTrigger id={`config-${config.id}`} className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {config.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => console.log("Formulário cancelado.")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ConfigsMeioPagamento;
