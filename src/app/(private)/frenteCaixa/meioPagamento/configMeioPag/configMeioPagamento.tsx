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
import {  CardTitle } from "@/components/ui/card";
import { ConfiguracaoMeioPag, MeioPgto } from "../types";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { atualizarDescricaoMeioPgto} from "../service";
import { useAtualizarConfigMpgto, useFetchByIdMeioPgto } from "../useMeioPag";
import { FloatInput } from '@/components/shared/floatInput';
import { IntegerInput } from '@/components/shared/integerInput';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CircleHelp } from 'lucide-react';
import { CardContent } from "@mui/material";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

  // DATA
  const { data : dataConfigMpgto } = useFetchByIdMeioPgto('1');

  // Atualiza os estados assim que os dados são carregados
  useEffect(() => {
    if (dataConfigMpgto) {
      setDadosMeioPgto(dataConfigMpgto);
      setConfigDadosMeioPgto(dataConfigMpgto.configuracao || []);
      setOriginalConfigDadosMeioPgto(dataConfigMpgto.configuracao || []);
    }
  }, [dataConfigMpgto]);

  // ======== MUTEDS ======== 
  const { mutate: atualizaConfigMpgto } = useAtualizarConfigMpgto();

    // Opções de operações permitidas
    const opcoesOperacoes = [
      { id: "RC", label: "Recarga Celular" },
      { id: "VG", label: "Vale-Gás" },
      { id: "PC", label: "Pagamento Contas" },
      { id: "CV", label: "Cashback Vendas" },
      { id: "CB", label: "Cartão Benefício" },
      { id: "PP", label: "Pagamento Pix" },
    ];
  
    // Obtém os valores atualmente selecionados
    const valoresSelecionados = configDadosMeioPgto.find((item) => item.nomeCampo === "OperacoesPermitidas")?.stringValue?.split(",") || [];
  
    // Atualiza os valores ao interagir com os checkboxes
    const handleCheckboxChange = (id: string) => {
      const novoValor = valoresSelecionados.includes(id)
        ? valoresSelecionados.filter((item) => item !== id) // Remove se já estiver selecionado
        : [...valoresSelecionados, id]; // Adiciona ao array
      
      handleChange("stringValue", novoValor.join(","), "OperacoesPermitidas");
      
    };
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
    <form className="p-4">
      
        {/* ==================== INFORMAÇÕES ===================== */}
        <Separator className="my-3" />
        <div className="flex justify-center md:justify-normal gap-2 mb-5 font-sans ">
          <div className="flex flex-col gap-1 items-center">
            <CardTitle>Id</CardTitle>
            <Input
              id="id"
              value={dadosMeioPgto.id}
              className="w-12 text-center bg-slate-300 "
              disabled
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <CardTitle>Descrição</CardTitle>
            <Input
              id={dadosMeioPgto.id.toString()}
              value={dadosMeioPgto.descricao ?? ""}
              onChange={(evt) =>
                setDadosMeioPgto((prev) => prev ? { ...prev, descricao: evt.target.value } : prev)
              }
              className="w-full md:w-52"
            />
          </div>
        </div>
        <Separator className="my-3" />
        {/* ================================================================================== */}     
        {/*=================================== GERAL ========================================= */}
        {/* ================================================================================== */}     
        <CardTitle className="m-3 ">Geral</CardTitle>
        <div className="flex flex-wrap gap-2 font-sans text-xs justify-center md:justify-normal">

          {/* ========= LIBERAÇÃO SUPERVISOR ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal ">
              <div className='flex'>
                <label htmlFor="LiberacaoSupervisorSelect" className="block whitespace-nowrap  p-1 pl-1">
                  Supervisor
                </label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Liberação Supervisor</u> -</strong>  Essa opção indica se o meio de pagamento vai solicitar Supervisor (Fiscal de Caixa) ao ser selecionado </PopoverContent>
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
                  <label htmlFor="GrupoMeioPgto" className="block whitespace-nowrap  p-1 pl-1">
                    Grupo 
                  </label>
                  <Popover>
                      <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                      <PopoverContent ><strong><u>Grupo meio de pagamento</u> - </strong>Defina aqui o grupo qual o meio de pagamento pertence</PopoverContent>
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
                  <label htmlFor="LiberacaoSupervisorTrocoSelect" className="block whitespace-nowrap  p-1 pl-1">
                    Troco 
                  </label>
                  <Popover>
                      <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                      <PopoverContent ><strong><u>Permite Troco</u> - </strong> Esta opção define se o meio de pagamento aceita a entrega de troco. 
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
                <label htmlFor="MpgtoTroco" className="block  whitespace-nowrap   p-1">Troco Max</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Troco Máximo</u> - </strong>Defina nesse campo o <u>troco máximo</u> permitido para esse meio de pagamento</PopoverContent>
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
                <label htmlFor="MpgtoTroco" className="block  whitespace-nowrap   p-1">M.P Troco</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Meio De Pagamento Troco</u> - </strong>Essa opção eu não tenho certeza. Preciso que me expliquem melhor kk</PopoverContent>
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
                <label htmlFor="LiberacaoSupervisorTrocoSelect" className="block whitespace-nowrap  p-1 pl-1">
                  Lib. Supervisor
                </label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Permite Troco</u> - </strong>Essa opção indica se o meio de pagamento precisa
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
                <label htmlFor="EmiteContraVale" className="block whitespace-nowrap  p-1 pl-1">
                  Emite Cv
                </label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Emite Contra Vale</u> - </strong>Essa opção indica se o meio de pagamento emite <u>Contra Vale</u></PopoverContent>
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
          {/* ============== IDENTIFICAÇÃO CONTRA VALE ================ */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal ">
              <div className='flex'>
                <label htmlFor="IdentificacaoContraVale" className="block whitespace-nowrap  p-1 pl-1">
                  Tipo Cv
                </label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Indentificação Contra Vale</u> - </strong>Defina aqui qual o tipo de <u>identificação</u> do contra vale</PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "IdentificacaoContraVale")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "IdentificacaoContraVale")}
                disabled={!permiteTroco}
              >
                <SelectTrigger  id="IdentificacaoContraVale">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="D">Dinheiro</SelectItem> 
                  <SelectItem value="C">Cartão</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ================================================================================== */}
          {/* ====================================== CARTOES =================================== */}
          {/* ================================================================================== */}
          <Separator className="my-3"/>
          <CardTitle className="ml-3 text-base flex w-full ">Cartões</CardTitle>
          {/* ========= TIPO CARTÃO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className="flex">
                <label htmlFor="TipoCartaoTef" className="block whitespace-nowrap p-1   ">
                  Tipo Cartão
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Aciona Gaveta</u> - </strong>Define se o meio de pagamento vai acionar a gaveta</PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "TipoCartaoTef")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "TipoCartaoTef")}
              >
                <SelectTrigger id="TipoCartaoTef">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">Crédito</SelectItem> 
                  <SelectItem value="D">Débito</SelectItem> 
                  <SelectItem value="P">Pix</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========= TIPO PARC CARTÃO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-36 md:justify-normal">
              <div className="flex">
                <label htmlFor="TipoParcCartao" className="block whitespace-nowrap p-1   ">
                  Tipo Parc
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Tipo Parcelamento Cartão</u> - </strong>Define o tipo de parcelamento do cartão</PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "TipoParcCartao")?.stringValue ?? ""} // Valor atual do seletor
                onValueChange={(value) =>handleChange("stringValue", value, "TipoParcCartao")}
              >
                <SelectTrigger  id="TipoParcCartao">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="A">A vista</SelectItem> 
                  <SelectItem value="L">Loja</SelectItem> 
                  <SelectItem value="D">Administradora</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========= CARTÃO DIGITADO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <label htmlFor="CartaoDigitadoSelect" className=" whitespace-nowrap   p-1">
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
          {/* ==================================================================================== */}
          {/* ====================================== CONVENIOS =================================== */}
          {/* ==================================================================================== */}
          <Separator className="my-3"/>
          <CardTitle className="ml-3 text-base flex w-full sidebar-border">Convênio </CardTitle>
          {/* ========= IDENTIFICACAO CONVENIO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal  ">
              <div className="flex">
                <label htmlFor="IdentificacaoConvenio" className="block whitespace-nowrap p-1   ">
                  Entrada
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Tipo Entrada Convênio</u> - </strong>Define o tipo de entrada que vai receber os dados no PDV</PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "IdentificacaoConvenio")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "IdentificacaoConvenio");}}
              >
                <SelectTrigger id="IdentificacaoConvenio">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P">Padrão</SelectItem>
                  <SelectItem value="C">Código</SelectItem>
                  <SelectItem value="J">Cpf / Cnpj</SelectItem>
                  <SelectItem value="T">Cartão</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========== VIAS CONVENIO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className='flex'>
                  <label htmlFor="ViasConvenio" className="block whitespace-nowrap  p-1 pl-1">
                    Vias
                  </label>
                  <Popover>
                      <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                      <PopoverContent ><strong><u>Número de Vias</u> - </strong>Defina quantas cópias do recibo serão impressas para cada vendaa </PopoverContent>
                  </Popover>
              </div>
              <IntegerInput
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "ViasConvenio")?.integerValue ?? 0}
                onChange={(e) => {
                  const newValue = e;
                  handleChange("integerValue", newValue, "ViasConvenio");
                }}
              />
            </div>            
          }
          {/* ==================================================================================== */}
          {/* ====================================== SANGRIAS =================================== */}
          {/* ==================================================================================== */}
          <Separator className="my-3"/>
          <CardTitle className="ml-3 text-base flex w-full ">Sangrias</CardTitle>
          {/* ========= EFETUAR SANGRIA ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32 md:justify-normal">
              <div className="flex">
                <label htmlFor="EfetuarSangria" className="block whitespace-nowrap p-1   ">
                  Efetua Sang
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Efetua Sangria</u> - </strong>Selecione se o PDV deve realizar a sangria, ou seja, a retirada de valores do caixa para segurança e organização.</PopoverContent>
                </Popover>
              </div>
              
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
                  <SelectItem value="F">Fechamento</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* =========== NUMERO DE VIAS SANGRIA =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className='flex'>
                <label htmlFor="ViasSangria" className="block  whitespace-nowrap   p-1">Vias Sang</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Número de vias Sangria</u> - </strong>Defina quantas cópias do comprovante de sangria serão impressas a cada operação. <i>Essa configuração é útil para ter registros físicos para conferência e controle do caixa.</i></PopoverContent>
                </Popover>
              </div>
              <IntegerInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "ViasSangria")?.integerValue ?? 0}
                onChange={((value: number) => handleChange("integerValue", value, "ViasSangria"))}
           
              />
            </div>            
          }
          {/* ========= TIPO SANGRIA ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32 md:justify-normal">
              <div className="flex">
                <label htmlFor="TipoSangria" className="block whitespace-nowrap p-1   ">
                  Tipo Sang
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Tipo Sangria Fechamento</u> - </strong>NÃO ENTENDI</PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "TipoSangria")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "TipoSangria");}}
              >
                <SelectTrigger  id="TipoSangria">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">NAO ENTENDI</SelectItem> 
                  <SelectItem value="D">NAO ENTENDI</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* ========= TIPO COLETA SANGRIA FECHAMENTO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32 md:justify-normal">
              <div className="flex">
                <label htmlFor="TipoSangriaFecham" className="block whitespace-nowrap p-1   ">
                  Tipo Coleta
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Tipo Sangria Fechamento</u> - </strong>NÃO ENTENDI</PopoverContent>
                </Popover>
              </div>
              <Select
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "TipoSangriaFecham")?.stringValue ?? ""}
                onValueChange={(value) => {handleChange("stringValue", value, "TipoSangriaFecham");}}
              >
                <SelectTrigger  id="TipoSangriaFecham">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="G">Efetua sangria do saldo meio pagamento</SelectItem> 
                  <SelectItem value="I">Informa valor para sangria</SelectItem> 
                  <SelectItem value="C">Valor configurado meio de pagamento</SelectItem> 
                </SelectContent>
              </Select>
            </div>
          }
          {/* =========== VALOR AVISO SANGRIA =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className='flex'>
                <label htmlFor="ValorAvisoSangria" className="block  whitespace-nowrap   p-1">Valor aviso</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Valor Aviso Sangria</u> - </strong>
                    Defina o valor limite que, ao ser ultrapassado, fará com que o sistema avise no caixa que é necessário efetuar a sangria. <i>Essa configuração ajuda a manter o controle e a segurança dos valores em caixa.</i></PopoverContent>
                </Popover>
              </div>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "ValorAvisoSangria")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "ValorAvisoSangria"))}
              />
            </div>            
          }
          {/* =========== VALOR BLOQUEIO SANGRIA =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className='flex'>
                <label htmlFor="ValorBloqSangria" className="block  whitespace-nowrap   p-1">Valor bloq</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Bloqueio Sangria</u> - </strong>Ative esta opção para que, ao atingir o valor limite, o caixa seja bloqueado, impedindo novas operações até que a sangria seja realizada. <i>Isso garante maior segurança e controle financeiro.</i></PopoverContent>
                </Popover>
              </div>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "ValorBloqSangria")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "ValorBloqSangria"))}
              />
            </div>            
          }
          {/* ==================================================================================== */}
          {/* ====================================== TICKETS =================================== */}
          {/* ==================================================================================== */}
          <Separator className="my-3"/>
          <CardTitle className="ml-3 text-base flex w-full ">Tickets</CardTitle>
          {/* =========== DESCONTO TICKET =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32 md:justify-normal">
              <div className='flex'>
                <label htmlFor="ValorBloqSangria" className="block  whitespace-nowrap   p-1">Desconto</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent ><strong><u>Tickets - Percentual de Desconto</u> - </strong>
                    Defina o percentual de desconto que será aplicado aos tickets. Esse valor reduzirá automaticamente o preço final, permitindo promoções e ajustes no caixa conforme necessário.</PopoverContent>
                </Popover>
              </div>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "DescontoTicket")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "DescontoTicket"))}
              />
            </div>            
          }
          {/* ================================================================================= */}
          {/* ====================================== OUTROS =================================== */}
          {/* ================================================================================= */}
          <Separator className="my-3"/>
          <CardTitle className="ml-3 text-base flex w-full ">Outros</CardTitle>
          {/* ========= ACIONA GAVETA ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal">
              <div className="flex">
                <label htmlFor="acionaGavetaSelect" className="block whitespace-nowrap p-1   ">
                  Aciona gaveta
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Aciona Gaveta</u> - </strong>Indica se o meio de pagamento deve abrir a gaveta do caixa automaticamente no final da transação.</PopoverContent>
                </Popover>
              </div>
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
          {/* ========= OPERAÇÕES PERMITIDAS ========== */}
          {
            <div className="flex flex-col mx-3 w-full justify-center md:w-28 md:justify-normal">
              <div className="flex">
                <label htmlFor="OperacoesPermitidas" className="block whitespace-nowrap p-1   ">
                  Op permitidas
                </label>
                <Popover>
                  <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                  <PopoverContent><strong><u>Opções Extras</u> – </strong>Configure operações adicionais que o PDV pode realizar, como recarga de celular.</PopoverContent>

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
                    <Label htmlFor={option.id} className="cursor-pointer select-none ">{option.label}</Label>
                  </div>
                ))}
              </div>

            </div>
          }
          {/* ==================================================================================== */}
          {/* =============================== Descontos Finalização  ============================= */}
          {/* ==================================================================================== */}
          <Separator className="my-3"/>
          <CardTitle className="ml-3 text-base flex w-full ">Descontos finalização</CardTitle>
          {/* ========= CÓDIGO PREÇO ========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-28 md:justify-normal  ">
              <div className='flex'>
                <label htmlFor="PercDesconto" className="block  whitespace-nowrap   p-1">Código Preço</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent><strong><u>Código Preço</u> - </strong> Não entendi muito bem.</PopoverContent>
                  </Popover>
              </div>
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
          {/* =========== PERCENTUAL DE DESCONTO TICKET =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32 md:justify-normal">
              <div className='flex'>
                <label htmlFor="PercDesconto" className="block  whitespace-nowrap   p-1">Perc Desconto</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent><strong><u>Percentual de Desconto</u> - </strong> Defina o percentual de desconto aplicado ao meio de pagamento no fechamento da venda. Esse desconto será calculado automaticamente sobre o valor total, permitindo ajustes promocionais e personalização de preços.</PopoverContent>
                  </Popover>
              </div>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "PercDesconto")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "PercDesconto"))}
              />
            </div>            
          }
          {/* =========== VALOR DESCONTO =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32 md:justify-normal">
              <div className='flex'>
                <label htmlFor="ValorDesconto" className="block  whitespace-nowrap   p-1">Valor Desconto</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent><strong><u>Valor de Desconto</u> - </strong> Especifique o valor do desconto aplicado ao meio de pagamento no fechamento da venda. Esse valor será deduzido automaticamente do total, permitindo ajustes promocionais e personalização de preços.</PopoverContent>

                  </Popover>
              </div>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "ValorDesconto")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "ValorDesconto"))}
              />
            </div>            
          }
          {/* =========== PERCENTUAL ACRESCIMO =========== */}
          {
            <div className="flex flex-col mx-3 w-1/3 justify-center md:w-32 md:justify-normal">
              <div className='flex'>
                <label htmlFor="PercAcrescimo" className="block  whitespace-nowrap   p-1">Perc acrescimo</label>
                <Popover>
                    <PopoverTrigger><CircleHelp size={13}/></PopoverTrigger>
                    <PopoverContent><strong><u>Percentual de Acréscimo</u> - </strong> Defina o percentual de acréscimo que será aplicado ao meio de pagamento no fechamento da venda. Esse valor aumentará automaticamente o total, permitindo ajustes e personalização de preços conforme necessário.</PopoverContent>
                  </Popover>
              </div>
              <FloatInput 
                value={configDadosMeioPgto.find((item) => item.nomeCampo === "PercAcrescimo")?.doubleValue ?? 0}
                onChangeValue={((value: number) => handleChange("doubleValue", Number(value), "PercAcrescimo"))}
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
