// src/components/ConfigsMeioPagamento.tsx

"use client";

import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
  ForwardedRef,
} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardTitle } from "@/components/ui/card";
import { ConfiguracaoMeioPag, MeioPgto } from "../types";
import api from "@/api/api";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { atualizarDescricaoMeioPgto, atualizarConfigMeioPag } from "../request";

// Definição das interfaces para as props e métodos expostos
interface ConfigsMeioPagamentoHandles {
  handleSubmit: () => Promise<void>;
}

interface ConfigsMeioPagamentoProps {
  // Adicione props aqui se necessário
}

const ConfigsMeioPagamento = forwardRef<
  ConfigsMeioPagamentoHandles,
  ConfigsMeioPagamentoProps
>((props, ref: ForwardedRef<ConfigsMeioPagamentoHandles>) => {
  
  // Estados para armazenar os dados originais da API
  const [dadosMeioPgto, setDadosMeioPgto] = useState<MeioPgto | null>(null);
  const [configDadosMeioPgto, setConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

// Estado adicional para armazenar os dados originais
const [originalConfigDadosMeioPgto, setOriginalConfigDadosMeioPgto] = useState<
  ConfiguracaoMeioPag[]
>([]);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await api.get<MeioPgto>("/v1/config/meiospgto/1");
      setDadosMeioPgto(response.data);
      setConfigDadosMeioPgto(response.data.configuracao);
      setOriginalConfigDadosMeioPgto(response.data.configuracao); // Salvar estado original
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setDadosMeioPgto(null);
      setMensagem("Erro ao carregar dados.");
    }
  }
  fetchData();
}, []);




  // handleChange para atualizar os estados diretamente
  const handleChange = (
    key: keyof ConfiguracaoMeioPag| MeioPgto,
    value: string,
    nomeCampo?: string
  ) => {
    // Encontrar a configuração específica pelo nomeCampo
    const configIndex = configDadosMeioPgto.findIndex(
      (item) => item.nomeCampo === nomeCampo
    );
  
    if (configIndex !== -1) {
      const updatedConfig = { ...configDadosMeioPgto[configIndex] };
  
      // Atualizar apenas o campo específico
      if (key === "stringValue") {
        updatedConfig.stringValue = value;
      }
      // Adicione outras atualizações de campo se necessário
  
      // Atualizar o estado local
      const updatedConfigs = [...configDadosMeioPgto];
      updatedConfigs[configIndex] = updatedConfig;
      setConfigDadosMeioPgto(updatedConfigs);
    }
  };
  

  // Encontrar o objeto "AcionaGaveta" na configuração
  const acionaGaveta = configDadosMeioPgto.find(
    (item) => item.nomeCampo === "AcionaGaveta"
  );

// Função para atualizar apenas os dados modificados
const handleSubmit = async () => {
  if (dadosMeioPgto?.id) {
    setLoading(true);
    setMensagem("");

    try {
      // Atualizar descrição se houver alteração
      if (
        dadosMeioPgto.descricao
      ) {
        await atualizarDescricaoMeioPgto(
          dadosMeioPgto.id,
          dadosMeioPgto.descricao,
          setMensagem,
          setDadosMeioPgto);
      }

      // Filtrar apenas os itens que foram alterados
      const alteredConfigs = configDadosMeioPgto.filter((config, index) => {
        const original = originalConfigDadosMeioPgto[index];
        return (
          original &&
          (config.stringValue !== original.stringValue ||
            config.integerValue !== original.integerValue ||
            config.doubleValue !== original.doubleValue ||
            config.dateValue !== original.dateValue)
        );
      });

      // Atualizar apenas os campos alterados
      const promises = alteredConfigs.map((config) => atualizarConfigMeioPag(config, setMensagem, setConfigDadosMeioPgto));
      await Promise.all(promises);

      setMensagem("Atualização concluída com sucesso!");
    } catch (error) {
      console.error("Erro na atualização:", error);
      setMensagem("Erro ao atualizar as configurações.");
    } finally {
      setLoading(false);
    }
  }
};
  

  // Expondo a função para o componente pai
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  // Se os dados originais ainda não foram carregados, não renderiza o form
  if (!dadosMeioPgto) {
    return <div>Carregando dados...</div>; // ou um loading...
  }

  return (
    <form className="space-y-6">
      <CardContent>
        {/* ==================== INFORMAÇÕES GERAIS ===================== */}
        <CardTitle>Informações Gerais</CardTitle>
        <Separator className="my-3" />
        <div className="flex gap-1 mb-4">
          <div className="box">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              Id
            </label>
            {/* Campo somente leitura (não precisa de onChange) */}
            <Input
              id="id"
              value={dadosMeioPgto.id}
              className="w-12 bg-slate-300"
              disabled
            />
          </div>
          <div className="ml-4">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <Input
              id="descricao"
              value={dadosMeioPgto.descricao ?? ""}
              onChange={(evt) =>
                setDadosMeioPgto((prev) => prev ? { ...prev, descricao: evt.target.value } : prev)
              }
              className="w-72"
            />

          </div>
        </div>
        <Separator className="my-3" />

        {/* =============== CONFIGURAÇÕES ====================== */}
        <CardTitle className="my-3">Configurações</CardTitle>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          {/* Verifica se o objeto "AcionaGaveta" existe */}
          {acionaGaveta && (
            <>
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="acionaGavetaSelect" className="block text-sm font-medium text-gray-700">
                  Aciona Gaveta:
                </label>
                <Select
                  // Valor direto do estado
                  value={acionaGaveta.stringValue ?? ""}
                  onValueChange={(value) =>
                    handleChange("stringValue", value, "AcionaGaveta")
                  }
                >
                  <SelectTrigger className="w-[180px]" id="acionaGavetaSelect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">Sim (S)</SelectItem>
                    <SelectItem value="N">Não (N)</SelectItem>
                  </SelectContent>
                </Select>
                
              </div>


            </>
          )}
        </div>
      </CardContent>
    </form>
  );
});

ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

export default ConfigsMeioPagamento;
