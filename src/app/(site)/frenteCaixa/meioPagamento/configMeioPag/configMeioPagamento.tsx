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
import {  CardTitle } from "@/components/ui/card";
import { ConfiguracaoMeioPag, MeioPgto } from "../types";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { atualizarDescricaoMeioPgto} from "../service";
import api from "@/api/api";
import { useAtualizarConfigMpgto } from "../useMeioPag";
import { FloatInput } from '@/components/shared/floatInput';
import { IntegerInput } from '@/components/shared/integerInput';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CircleHelp } from 'lucide-react';

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
        <div className="flex gap-1 mb-4 font-ubuntu ">
          <div className="box">
            <label htmlFor="id" className="block text-sm font-Atkinson text-gray-700 p-1">
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
            <label htmlFor="descricao" className="block text-sm  text-gray-700 p-1">
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

        {/* =============== Geral ====================== */}
        <CardTitle className="my-3">Geral</CardTitle>
        <div className="flex flex-wrap gap-4 font-ubuntu">
          {/* =============================================================================== */}
          {/* ================================== SELECTS ==================================== */}
          {/* =============================================================================== */}
          {/* ========= LIBERAÇÃO SUPERVISOR ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "LiberacaoSupervisor") && (
            <div className="flex flex-col md:w-1/6 ">
              <label htmlFor="LiberacaoSupervisorSelect" className="block whitespace-nowrap text-sm  text-gray-700 ">
                Supervisor {"    "}
                <Popover>
                  <PopoverTrigger><CircleHelp size={13} className='pb-0'/></PopoverTrigger>
                  <PopoverContent className='text-sm'>Essa opção indica se o meio de pagamento vai solicitar Supervisor (Fiscal de Caixa) ao ser selecionado </PopoverContent>
                </Popover>
              </label>

           
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "AcionaGaveta")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "AcionaGaveta")}
              >
                <SelectTrigger className="w-[100px]" id="acionaGavetaSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          )}
          {/* ========= ACIONA GAVETA ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "AcionaGaveta") && (
            <div className="flex flex-col md:w-1/6 ">
              <label htmlFor="acionaGavetaSelect" className="block whitespace-nowrap text-sm  text-gray-700 p-1">
                Aciona Gaveta
              </label>
           
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "AcionaGaveta")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "AcionaGaveta")}
              >
                <SelectTrigger className="w-[100px]" id="acionaGavetaSelect">
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
            <div className="flex flex-col w-full md:w-1/6 ">
              <label htmlFor="codigoPrecoSelect" className="block text-sm whitespace-nowrap  text-gray-700 p-1">
                Código Preço
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "CodigoPreco")?.integerValue.toString() ?? ""}
                onValueChange={(value) => {handleChange("integerValue", Number(value), "CodigoPreco");}}
              >
                <SelectTrigger className="w-[100px]" id="codigoPreco">
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
            <div className="flex flex-col w-full md:w-1/6">
              <label htmlFor="CartaoDigitadoSelect" className="text-sm whitespace-nowrap font-medium text-gray-700 p-1">
                Cartão Digitado
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "CartaoDigitado")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "CartaoDigitado");}}
              >
                <SelectTrigger className="w-[120px]" id="CartaoDigitado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          )}
          {/* ========= EMITE CONTRAVALE ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "EmiteContraVale") && (
            <div className="flex flex-col w-full md:w-1/6">
              <label htmlFor="EmiteContraValeSelect" className="block text-sm whitespace-nowrap font-medium text-gray-700 p-1">
                Emite Contra Vale
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "EmiteContraVale")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "EmiteContraVale");}}
              >
                <SelectTrigger className="w-[100px]" id="EmiteContraVale">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          )}
          {/* ========= EFETUAR SANGRIA ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "EfetuarSangria") && (
            <div className="flex flex-col w-full md:w-1/6">
              <label htmlFor="EfetuarSangriaSelect" className="block text-sm whitespace-nowrap font-medium text-gray-700 p-1">
                Efetuar Sangria
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "EfetuarSangria")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "EfetuarSangria");}}
              >
                <SelectTrigger className="w-[100px]" id="EfetuarSangria">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          )}
          {/* =============================================================================== */}
          {/* ================================== INPUTS ==================================== */}
          {/* =============================================================================== */}
          {/* =========== DESCONTO TICKET =========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "DescontoTicket") && (
            <div className="flex flex-col w-full md:w-28">
              <label htmlFor="DescontoTicketSelect" className="block text-sm whitespace-nowrap font-medium text-gray-700 p-1">
                Desconto Ticket
              </label>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "DescontoTicket")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", value, "DescontoTicket"))}
              />
            </div>            
          )}
          {/* ========== GRUPO MEIO PAGAMENTO ========== */}
          {configDadosMeioPgto.find((item) => item.nomeCampo === "GrupoMeioPgto") && (
            <div className="flex flex-col w-full md:w-1/6">
              <label htmlFor="GrupoMeioPgto" className="block text-sm font-medium whitespace-nowrap text-gray-700 p-1">
                Grupo Meio Pagamento
              </label>
              <IntegerInput
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "GrupoMeioPgto")?.integerValue ?? 0}
                onChange={(e) => {
                  const newValue = e;
                  handleChange("integerValue", newValue, "GrupoMeioPgto");
                }}
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
