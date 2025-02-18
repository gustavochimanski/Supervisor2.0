// ConfigsMeioPagamento.tsx
"use client";
import { NumericFormat } from 'react-number-format';

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
import { atualizarDescricaoMeioPgto} from "../service";
import api from "@/api/api";
import { useAtualizarConfigMpgto } from "../useMeioPag";
import { FloatInput } from '@/components/shared/floatInput';


interface ConfigsMeioPagamentoHandles {
  handleSubmit: () => Promise<void>;
}


const ConfigsMeioPagamento = forwardRef<ConfigsMeioPagamentoHandles>((props, ref: ForwardedRef<ConfigsMeioPagamentoHandles>) => {

  //======= ESTADOS =======
  const [dadosMeioPgto, setDadosMeioPgto] = useState<MeioPgto | null>(null);
  const [configDadosMeioPgto, setConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);
  const [originalConfigDadosMeioPgto, setOriginalConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);

  // MENSAGEM E LOADING
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // ======== MUTEDS ======== 
  const {mutate: atualizaConfigMpgto} = useAtualizarConfigMpgto();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<MeioPgto>("/v1/config/meiospgto/1");
        const { configuracao } = response.data;
        
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
    key: keyof ConfiguracaoMeioPag,
    value: any,
    nomeCampo: string
  ) => {
    if (!nomeCampo) {
      console.warn("nomeCampo não fornecido para handleChange");
      return;
    }
    
    setConfigDadosMeioPgto((prevConfigs) =>
      prevConfigs.map((config) => {
        if (config.nomeCampo === nomeCampo) {
          return { ...config, [key]: value };
        }
        return config;
      })
    );
  };

  const handleSubmit = async () => {
    if (dadosMeioPgto?.id) { 
      setLoading(true);
      setMensagem("");

      try {
        // Atualiza a descrição caso tenha sido alterada
        if (dadosMeioPgto.descricao) {
          await atualizarDescricaoMeioPgto(
            dadosMeioPgto.id.toString(),
            dadosMeioPgto.descricao,
          );
        }
        
        // Atualiza o Config
        // Verifica se houve alteração nas configurações
        if (
          JSON.stringify(configDadosMeioPgto) !==
          JSON.stringify(originalConfigDadosMeioPgto)
        ) {
          // Chama o hook para atualizar as configurações
          atualizaConfigMpgto(configDadosMeioPgto);
      
        }

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
    <form>
        {/* ==================== INFORMAÇÕES GERAIS ===================== */}
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
              id={dadosMeioPgto.id.toString()}
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
        <div className="flex gap-4 items-center">
          {/* ========= ACIONA GAVETA ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "AcionaGaveta") && (
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="acionaGavetaSelect" className="block text-sm font-medium text-gray-700">
                Aciona Gaveta
              </label>
           
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "AcionaGaveta")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "AcionaGaveta")}
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
          {configDadosMeioPgto.find((item) => item.nomeCampo === "CodigoPreco") && (
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="codigoPrecoSelect" className="block text-sm font-medium text-gray-700">
                Código Preço
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "CodigoPreco")?.integerValue.toString() ?? ""}
                onValueChange={(value) => {handleChange("integerValue", Number(value), "CodigoPreco");}}
              >
                <SelectTrigger className="w-[180px]" id="codigoPreco">
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
          {/* ========= CARTÃO DIGITADO ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "CartaoDigitado") && (
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="CartaoDigitadoSelect" className="block text-sm font-medium text-gray-700">
                Cartão Digitado
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "CartaoDigitado")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "CartaoDigitado");}}
              >
                <SelectTrigger className="w-[180px]" id="CartaoDigitado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          )}
          {/* ========= DESCONTO TICKET ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "DescontoTicket") && (
            <div className="flex flex-col w-full md:w-1/2">
              <label htmlFor="DescontoTicketSelect" className="block text-sm font-medium text-gray-700">
                Desconto Ticket
              </label>
              
              
              <FloatInput
                
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "DescontoTicket")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", value, "DescontoTicket"))}
              />
              
            </div>            
          )}
        </div>
      {/* Exibe mensagens para o usuário */}
      {mensagem && <div className="mt-4 text-center text-sm text-red-500">{mensagem}</div>}
    </form>
  );
});

ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

export default ConfigsMeioPagamento;
