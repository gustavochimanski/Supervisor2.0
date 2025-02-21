"use client";

import React, { useImperativeHandle, useState, forwardRef, useEffect, ForwardedRef } from "react";
import { ConfiguracaoMeioPag, MeioPgto } from "../types";
import { Separator } from "@/components/ui/separator";
import { atualizarDescricaoMeioPgto } from "../service";
import { useAtualizarConfigMpgto, useFetchByIdMeioPgto } from "../useMeioPag";
import GeneralSettings from "./Geral";
import OtherSettings from "./Outras";
import InfoSection from "./InfoSection";
import TrocoSettings from "./Troco";
import CartaoSettings from "./Cartao";
import ConvenioSettings from "./Convenio";
import SangriaSettings from "./Sangria";
import TicketSettings from "./Tickets";

interface ConfigsMeioPagamentoHandles {
  handleSubmit: () => Promise<void>;
}

const ConfigsMeioPagamento = forwardRef<ConfigsMeioPagamentoHandles>((props, ref: ForwardedRef<ConfigsMeioPagamentoHandles>) => {
  const [dadosMeioPgto, setDadosMeioPgto] = useState<MeioPgto | null>(null);
  const [configDadosMeioPgto, setConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);
  const [originalConfigDadosMeioPgto, setOriginalConfigDadosMeioPgto] = useState<ConfiguracaoMeioPag[]>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { data: dataConfigMpgto } = useFetchByIdMeioPgto("1");
  const { mutate: atualizaConfigMpgto } = useAtualizarConfigMpgto();

  useEffect(() => {
    if (dataConfigMpgto) {
      setDadosMeioPgto(dataConfigMpgto);
      setConfigDadosMeioPgto(dataConfigMpgto.configuracao || []);
      setOriginalConfigDadosMeioPgto(dataConfigMpgto.configuracao || []);
    }
  }, [dataConfigMpgto]);

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

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  if (!dadosMeioPgto) {
    return <div>Carregando dados...</div>;
  }

  return (
    <form className="p-4 flex flex-col">
      <Separator className="my-3"/>
      <InfoSection dadosMeioPgto={dadosMeioPgto} setDescricao={(desc) =>
        setDadosMeioPgto((prev) => prev && { ...prev, descricao: desc })}
      />
      <Separator className="my-5"/>
      <GeneralSettings  configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
      <Separator className="my-5"/>
      <TrocoSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
      <Separator className="my-5"/>
      <CartaoSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
      <Separator className="my-5"/>
      <ConvenioSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
      <Separator className="my-5"/>
      <SangriaSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
      <Separator className="my-5"/>
      <TicketSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
      <Separator className="my-5"/>
      <OtherSettings configDadosMeioPgto={configDadosMeioPgto} handleChange={handleChange} />
      <Separator className="my-5"/>
      {mensagem && <div className="mt-4 text-center text-red-500">{mensagem}</div>}
    </form>
  );
});

ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

export default ConfigsMeioPagamento;
