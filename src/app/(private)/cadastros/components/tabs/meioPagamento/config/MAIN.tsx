"use client";

import React, { useImperativeHandle, useState, forwardRef, useEffect, ForwardedRef } from "react";

import { Separator } from "@/components/ui/separator";
import { ConfiguracaoMeioPag, MeioPgto } from "@/app/(private)/cadastros/types/typesMeioPag";
import { CardContent, CardDescription } from "@/components/ui/card";
import InfoSection from "./Informacoes";
import GeneralSettings from "./Geral";
import CartaoSettings from "./Cartao";
import ConvenioSettings from "./Convenio";
import SangriaSettings from "./Sangria";
import TrocoSettings from "./Troco";
import DescontosSettings from "./Descontos";
import ContraValeSettings from "./ContraVale";
import TicketSettings from "./Tickets";
import OtherSettings from "./Outras";
import { useAtualizarConfigMpgto, useFetchByIdMeioPgto } from "@/app/(private)/cadastros/hooks/useMeioPag";
import { atualizarDescricaoMeioPgto } from "@/app/(private)/cadastros/services/MeioPagtoService";


interface ConfigsMeioPagamentoHandles {
  handleSubmit: () => Promise<void>;
}

interface Props {
  idMeioPgto: string;
}

const ConfigsMeioPagamento = forwardRef<ConfigsMeioPagamentoHandles, Props>(
  ({ idMeioPgto }, ref) => {
    const [dadosMeioPgto, setDadosMeioPgto] = useState<MeioPgto | null>(null);
    const [configDadosMeioPgto, setConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);
    const [originalConfigDadosMeioPgto, setOriginalConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);
    const [mensagem, setMensagem] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Aqui você usa o ID dinâmico:
    const { data: dataConfigMpgto } = useFetchByIdMeioPgto(idMeioPgto);
    const { mutate: atualizaConfigMpgto } = useAtualizarConfigMpgto();

  useEffect(() => {
    if (dataConfigMpgto) {
      setDadosMeioPgto(dataConfigMpgto);
      setConfigDadosMeioPgto(dataConfigMpgto.configuracao || []);
      setOriginalConfigDadosMeioPgto(dataConfigMpgto.configuracao || []);
    }
  }, [dataConfigMpgto]);

  // LIDA COM MUDANÇA E ATUALIZA OS DADOS DO FORMULARIO
  const handleChange = (
    key: keyof ConfiguracaoMeioPag, 
    value: any, 
    nomeCampo: string
  ) => {
    if (!nomeCampo) {
      console.warn("nomeCampo não fornecido para handleChange");
      return;
    }
  
    setConfigDadosMeioPgto((prevConfigs) => {
      return prevConfigs.map((config) => {
        if (config.nomeCampo === nomeCampo) {
          return { 
            ...config, 
            [key]: value 
          };
        }
        return config;
      });
    });
  };
    
  // SUBMIT PARA ATUALIZAR OS DADOS
  const handleSubmit = async () => {
    if (dadosMeioPgto?.id) {
      setLoading(true);
      setMensagem("");

      try {
        if (dadosMeioPgto.descricao) {
          await atualizarDescricaoMeioPgto(dadosMeioPgto.id.toString(), dadosMeioPgto.descricao);
        }

        if (JSON.stringify(configDadosMeioPgto) !== JSON.stringify(originalConfigDadosMeioPgto)) {
          atualizaConfigMpgto(configDadosMeioPgto);
        }

        setMensagem("Atualização concluída com sucesso!");
      } catch (error) {
        setMensagem("Erro ao atualizar as configurações.");
      } finally {
        setLoading(false);
      }
    }
  };

  // REFERÊNCIA PARA BUTTON
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  if (!dadosMeioPgto) {
    return <div>Carregando dados...</div>;
  }

  return (
    <form className="p-4 flex flex-col">
      <CardDescription>
        <Separator className="my-3"/>
        <InfoSection 
          dadosMeioPgto={dadosMeioPgto}
          setDescricao={(desc) =>
            setDadosMeioPgto((prev) => prev && { ...prev, descricao: desc })
          }
          setTipoMpgto={(tipo) =>
            setDadosMeioPgto((prev) => prev && { ...prev, tipoMeioPgto: tipo })
          }
        />

      </CardDescription>
      {/* </CardHeader> */}
      <CardContent>
        <Separator className="my-5"/>
        <GeneralSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
        <Separator className="my-5"/>
        <CartaoSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
        <Separator className="my-5"/>
        <ConvenioSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
        <Separator className="my-5"/>
        <SangriaSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
        <Separator className="my-5"/>
        <TrocoSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
        <Separator className="my-5"/>
        <DescontosSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange}/>
        <Separator className="my-5"/>
        <ContraValeSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange}/>
        <Separator className="my-5"/>
        <TicketSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
        <Separator className="my-5"/>
        <OtherSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
        <Separator className="my-5"/>
      </CardContent>
      {mensagem && <div className="mt-4 text-center text-red-500">{mensagem}</div>}
    </form>
  );
});

ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

export default ConfigsMeioPagamento;
