// ConfigsMeioPagamento.tsx
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { atualizarDescricaoMeioPgto, atualizarConfigMeioPag } from "../request";
import api from "@/api/api";

interface ConfigsMeioPagamentoHandles {
  handleSubmit: () => Promise<void>;
}

const ConfigsMeioPagamento = forwardRef<
  ConfigsMeioPagamentoHandles
>((props, ref: ForwardedRef<ConfigsMeioPagamentoHandles>) => {
  const [dadosMeioPgto, setDadosMeioPgto] = useState<MeioPgto | null>(null);
  const [configDadosMeioPgto, setConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [originalConfigDadosMeioPgto, setOriginalConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<MeioPgto>("/v1/config/meiospgto/1");
        const { configuracao, ...meioPgto } = response.data;
        
        setDadosMeioPgto(response.data);
        setConfigDadosMeioPgto(configuracao);
        setOriginalConfigDadosMeioPgto(configuracao);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setMensagem("Erro ao carregar dados.");
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (
    key: keyof ConfiguracaoMeioPag | keyof MeioPgto,
    value: any,
    nomeCampo: string
  ) => {
    if (!nomeCampo) {
      console.warn("nomeCampo não fornecido para handleChange");
      return;
    }
    console.log(`handleChange chamado para nomeCampo: ${nomeCampo}, key: ${key}, value: ${value}`);
    
    setConfigDadosMeioPgto((prevConfigs) =>
      prevConfigs.map((config) => {
        if (config.nomeCampo === nomeCampo) {
          return { ...config, [key]: value };
        }
        return config;
      })
    );
  };

  const codigoPreco = configDadosMeioPgto.find(
    (item) => item.nomeCampo === "CodigoPreco"
  );
  const acionaGaveta = configDadosMeioPgto.find(
    (item) => item.nomeCampo === "AcionaGaveta"
  );

  const handleSubmit = async () => {
    if (dadosMeioPgto?.id) { 
      setLoading(true);
      setMensagem("");

      try {
        // Verifica se a descrição foi alterada
        if (dadosMeioPgto.descricao) {
          await atualizarDescricaoMeioPgto(
            dadosMeioPgto.id,
            dadosMeioPgto.descricao,
            setMensagem,
            setDadosMeioPgto
          );
        }

        // Filtra apenas as configurações que foram alteradas
        const alteredConfigs = configDadosMeioPgto.filter((config) => {
          const original = originalConfigDadosMeioPgto.find(
            (orig) => orig.nomeCampo === config.nomeCampo
          );
          return (
            original &&
            (config.stringValue !== original.stringValue ||
              config.integerValue !== original.integerValue ||
              config.doubleValue !== original.doubleValue ||
              config.dateValue !== original.dateValue)
          );
        });

        // Atualiza cada configuração alterada
        const promises = alteredConfigs.map((config) =>{
          atualizarConfigMeioPag(dadosMeioPgto.id, config, setMensagem, setConfigDadosMeioPgto)
      });
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

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  if (!dadosMeioPgto) {
    return <div>Carregando dados...</div>;
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
          {/* ========= ACIONA GAVETA ========== */}
          {acionaGaveta && (
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="acionaGavetaSelect" className="block text-sm font-medium text-gray-700">
                Aciona Gaveta
              </label>
           
              <Select
                value={acionaGaveta.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>
                  handleChange("stringValue", value, "AcionaGaveta") // Atualiza o estado ao mudar o valor
                }
              >
                <SelectTrigger className="w-[180px]" id="acionaGavetaSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          )}

          {/* ========= CÓDIGO PREÇO ========== */}
          {codigoPreco && (
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="codigoPrecoSelect" className="block text-sm font-medium text-gray-700">
                Código Preço
              </label>
              
              <Select
                value={codigoPreco.integerValue?.toString() ?? "0"} // Garantindo que o valor do Select seja string
                onValueChange={(value) => {
                  handleChange("integerValue", Number(value), "CodigoPreco") // Convertendo a string para número
                }}
              >
                <SelectTrigger className="w-[180px]" id="codigoPrecoSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Preço 1</SelectItem>
                  <SelectItem value="2">Preço 2</SelectItem>
                  <SelectItem value="3">Preço 3</SelectItem>
                  <SelectItem value="4">Preço 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
      {/* Exibe mensagens para o usuário */}
      {mensagem && <div className="mt-4 text-center text-sm text-red-500">{mensagem}</div>}
      {/* Opcional: Botão para submeter as alterações diretamente no componente */}
      {/* <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Atualizando..." : "Atualizar Configurações"}
      </button> */}
    </form>
  );
});

ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

export default ConfigsMeioPagamento;
