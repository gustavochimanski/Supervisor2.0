"use client";

import React, { useImperativeHandle, useState, forwardRef, useEffect, ForwardedRef } from "react";
import { ConfiguracaoMeioPag, MeioPgto } from "../../types/typesMeioPag";
import { Separator } from "@/components/ui/separator";
import { atualizarDescricaoMeioPgto } from "../../../../../services/FrenteCaixa/MeioPagtoService";
import { useAtualizarConfigMpgto, useFetchByIdMeioPgto } from "../../hooks/useMeioPag";
import GeneralSettings from "../../components/MeioPagamento/ConfigsMeioPag/Geral";
import OtherSettings from "../../components/MeioPagamento/ConfigsMeioPag/Outras";
import InfoSection from "../../components/MeioPagamento/ConfigsMeioPag/Informacoes";
import TrocoSettings from "../../components/MeioPagamento/ConfigsMeioPag/Troco";
import CartaoSettings from "../../components/MeioPagamento/ConfigsMeioPag/Cartao";
import ConvenioSettings from "../../components/MeioPagamento/ConfigsMeioPag/Convenio";
import SangriaSettings from "../../components/MeioPagamento/ConfigsMeioPag/Sangria";
import TicketSettings from "../../components/MeioPagamento/ConfigsMeioPag/Tickets";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DescontosSettings from "../../components/MeioPagamento/ConfigsMeioPag/Descontos";
import ContraValeSettings from "../../components/MeioPagamento/ConfigsMeioPag/ContraVale";

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
