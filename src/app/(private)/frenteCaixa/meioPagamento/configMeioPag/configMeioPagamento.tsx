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

  // LIDA COM O SELECT DO PERMITE TROCO
  const [permiteTroco, setPermiteTroco] = useState(false);
  const [permiteTrocoString, setPermiteTrocoString] = useState("");
  const handlePermiteTroco = (value: string) => {
    if (value === "S"){
      setPermiteTroco(true)
    }else if (value=== "N"){
      setPermiteTroco(false)
    }else(window.alert("Opção Inválida"))
    setPermiteTrocoString(value)
  }

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
        {/* ==================== INFORMAÇÕES ===================== */}
        <Separator className="my-3" />
        <div className="flex justify-center md:justify-normal gap-1 mb-4 font-sans text-xs font-bold ">
          <div className="box">
            <label htmlFor="id" className="block font-Atkinson text-gray-500 font-bold ">
              Id
            </label>
            <Input
              id="id"
              value={dadosMeioPgto.id}
              className="w-12 bg-slate-300 "
              disabled
            />
          </div>
          <div className="ml-4">
            <label htmlFor="descricao" className="block  text-gray-500 ">
              Descrição
            </label>
            <Input
              id={dadosMeioPgto.id.toString()}
              value={dadosMeioPgto.descricao ?? ""}
              onChange={(evt) =>
                setDadosMeioPgto((prev) => prev ? { ...prev, descricao: evt.target.value } : prev)
              }
              className="w-full md:w-52 text-gray-500"
            />
          </div>
        </div>
        <Separator className="my-3" />

        {/* =============== Geral ====================== */}
        <CardTitle className="m-3 ">Geral</CardTitle>
        <div className="flex flex-wrap gap-4 font-sans text-xs justify-center md:justify-normal font-bold text-gray-400">

          {/* ========= LIBERAÇÃO SUPERVISOR ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal ">
              <div className='flex'>
                <label htmlFor="LiberacaoSupervisorSelect" className="block whitespace-nowrap text-gray-500 p-1 pl-1">
                  Supervisor
                </label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent className='text-xs'><strong><u>Liberação Supervisor</u> -</strong>  Essa opção indica se o meio de pagamento vai solicitar Supervisor (Fiscal de Caixa) ao ser selecionado </PopoverContent>
                </Popover>
              </div>

              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "LiberacaoSupervisor")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "LiberacaoSupervisor")}
              >
                <SelectTrigger  id="LiberacaoSupervisorSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========== GRUPO MEIO PAGAMENTO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className='flex'>
                  <label htmlFor="LiberacaoSupervisorTrocoSelect" className="block whitespace-nowrap text-gray-500 p-1 pl-1">
                    Grupo 
                  </label>
                  <Popover>
                      <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                      <PopoverContent className='text-xs'><strong><u>Grupo meio de pagamento</u> - </strong>Defina aqui o grupo qual o meio de pagamento pertence</PopoverContent>
                  </Popover>
              </div>
              <IntegerInput
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "GrupoMeioPgto")?.integerValue ?? 0}
                onChange={(e) => {
                  const newValue = e;
                  handleChange("integerValue", newValue, "GrupoMeioPgto");
                }}
              />
            </div>            
          }
          {/* ========= PERMITE TROCO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal ">
              <div className='flex'>
                  <label htmlFor="LiberacaoSupervisorTrocoSelect" className="block whitespace-nowrap text-gray-500 p-1 pl-1">
                    Troco 
                  </label>
                  <Popover>
                      <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                      <PopoverContent className="text-xs"><strong><u>Permite Troco</u> - </strong> Esta opção define se o meio de pagamento aceita a entrega de troco. 
                      <strong> Atenção </strong>ao habilitá-la, as configurações relacionadas a função de troco serão desbloqueadas.
                    </PopoverContent>
                  </Popover>
              </div>
              <Select
                value={permiteTrocoString} // Valor atual do seletor
                onValueChange={(value: string) => handlePermiteTroco(value)}
              >
                <SelectTrigger  id="LiberacaoSupervisorTrocoSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* =========== TROCO MÁXIMO PERMITIDO =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className='flex'>
                <label htmlFor="MpgtoTroco" className="block  whitespace-nowrap  text-gray-500 p-1">Troco Max</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent className='text-xs'><strong><u>Troco Máximo</u> - </strong>Defina nesse campo o <u>troco máximo</u> permitido para esse meio de pagamento</PopoverContent>
                </Popover>
              </div>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "TrocoMaximo")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "TrocoMaximo"))}
                disabled={!permiteTroco}
              />
            </div>            
          }
          {/* =========== MEIO DE PAGAMENTO DO TROCO =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className='flex'>
                <label htmlFor="MpgtoTroco" className="block  whitespace-nowrap  text-gray-500 p-1">M.P Troco</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent className='text-xs'><strong><u>Meio De Pagamento Troco</u> - </strong>Essa opção eu não tenho certeza. Preciso que me expliquem melhor kk</PopoverContent>
                </Popover>
              </div>
              <IntegerInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "MpgtoTroco")?.integerValue ?? 0}
                onChange={((value: number) => handleChange("integerValue", value, "MpgtoTroco"))}
                disabled={!permiteTroco}
              />
            </div>            
          }
          {/* ========= LIBERAÇÃO SUPERVISOR PARA TROCO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal ">
              <div className='flex'>
                <label htmlFor="LiberacaoSupervisorTrocoSelect" className="block whitespace-nowrap text-gray-500 p-1 pl-1">
                  Lib. Supervisor
                </label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent className='text-xs'><strong><u>Permite Troco</u> - </strong>Essa opção indica se o meio de pagamento precisa
                    de liberação do supervisor</PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "LiberacaoSupervisorTroco")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "LiberacaoSupervisorTroco")}
                disabled={!permiteTroco}
              >
                <SelectTrigger  id="LiberacaoSupervisorTrocoSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ============== EMITE CONTRA VALE ================ */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal ">
              <div className='flex'>
                <label htmlFor="EmiteContraVale" className="block whitespace-nowrap text-gray-500 p-1 pl-1">
                  Emite Cv
                </label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent className='text-xs'><strong><u>Emite Contra Vale</u> - </strong>Essa opção indica se o meio de pagamento emite <strong>Contra Vale</strong></PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "EmiteContraVale")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "EmiteContraVale")}
                disabled={!permiteTroco}
              >
                <SelectTrigger  id="EmiteContraVale">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========= ACIONA GAVETA ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <label htmlFor="acionaGavetaSelect" className="block whitespace-nowrap p-1  text-gray-500 ">
                Aciona Gaveta
              </label>
           
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "AcionaGaveta")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "AcionaGaveta")}
              >
                <SelectTrigger id="acionaGavetaSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========= CÓDIGO PREÇO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal  ">
              <label htmlFor="codigoPrecoSelect" className="block  whitespace-nowrap  text-gray-500 p-1">
                Código Preço
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "CodigoPreco")?.integerValue.toString() ?? ""}
                onValueChange={(value) => {handleChange("integerValue", Number(value), "CodigoPreco");}}
              >
                <SelectTrigger id="codigoPreco">
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
          }
          {/* ========= CARTÃO DIGITADO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <label htmlFor="CartaoDigitadoSelect" className=" whitespace-nowrap  text-gray-500 p-1">
                Cartão Digitado
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "CartaoDigitado")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "CartaoDigitado");}}
              >
                <SelectTrigger id="CartaoDigitado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========= EMITE CONTRAVALE ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <label htmlFor="EmiteContraValeSelect" className="block  whitespace-nowrap  text-gray-500 p-1">
                Emite Contra Vale
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "EmiteContraVale")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "EmiteContraVale");}}
              >
                <SelectTrigger  id="EmiteContraVale">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========= EFETUAR SANGRIA ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <label htmlFor="EfetuarSangriaSelect" className="block  whitespace-nowrap  text-gray-500 p-1">
                Efetuar Sangria
              </label>
              
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "EfetuarSangria")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "EfetuarSangria");}}
              >
                <SelectTrigger  id="EfetuarSangria">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Sim</SelectItem> 
                  <SelectItem value="N">Não</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* =========== DESCONTO TICKET =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <label htmlFor="DescontoTicketSelect" className="block  whitespace-nowrap  text-gray-500 p-1">
                Desconto Ticket
              </label>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "DescontoTicket")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "DescontoTicket"))}
              />
            </div>            
          }
        </div>
      {/* Exibe mensagens para o usuário */}
      {mensagem && <div className="mt-4 text-center  text-red-500">{mensagem}</div>}
    </form>
  );
});

ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

export default ConfigsMeioPagamento;
