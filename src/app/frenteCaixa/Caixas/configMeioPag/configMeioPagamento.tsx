"use client";

import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardTitle } from "@/components/ui/card";
import { MeioPgto } from "../types";
import api from "@/api/api";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ConfigsMeioPagamento = forwardRef((_, ref) => {
  // 1. Estado para armazenar os dados originais da API
  const [dadosMeioPgto, setDadosMeioPgto] = useState<MeioPgto | null>(null);
  const [configDadosMeioPgto, setConfigDadosMeioPgto] =
    useState<Record<string | number, any>>({});

  // Estado para armazenar os novos dados de forma parcial
  const [novoDadosMeioPgto, setNovoDadosMeioPgto] = useState<Partial<MeioPgto>>({});
  const [novoConfigDadosMeioPgto, setNovoConfigDadosMeioPgto] = useState<Record<string | number, any>>({});

  // 3. Buscar dados da API na montagem do componente
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/v1/config/meiospgto/1");
        setDadosMeioPgto(response.data);
        setConfigDadosMeioPgto(response.data.configuracao);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setDadosMeioPgto(null);
      }
    }
    fetchData();
  }, []);

  // FUNC PARA ALTERAR DESCRIÇÃO
  async function atualizarDescricaoMeioPgto(id: number, novaDescricao: string) {
    try {
      const response = await api.patch(`/v1/config/meiospgto/${id}`, {
        descricao: novaDescricao,
      });
      console.log("Sucesso:", response.data);
    } catch (err) {
      console.error("Erro ao atualizar descrição:", err);
    }
  }

  // handleChange para atualizar o estado de forma dinâmica
  const handleChange = (key: string, value: any) => {
    // Se for 'descricao', atualizamos novoDadosMeioPgto
    
    if (key === "descricao") {
      setNovoDadosMeioPgto((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else { // SENÃO, ATUALIZAMOS A CONFIGURAÇÃO
      setNovoConfigDadosMeioPgto((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // 6. handleSubmit exposto ao componente pai (e usado no próprio botão)
  const handleSubmit = () => {
    console.log("Novas alterações mpgto:", novoDadosMeioPgto);
    console.log("Novas alterações CONFIG MGTO:", novoConfigDadosMeioPgto);

    if (dadosMeioPgto?.id && novoDadosMeioPgto?.descricao) {
      atualizarDescricaoMeioPgto(dadosMeioPgto.id, novoDadosMeioPgto.descricao);
    }
  };

  // Expondo a função para o componente pai, se você precisar chamá-la de fora
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  // 7. Se os dados originais ainda não foram carregados, não renderiza o form
  if (!dadosMeioPgto) {
    return null; // ou um loading...
  }

  return (
    <form className="space-y-6">
      <CardContent>
        {/* ==================== INFORMAÇÕES GERAIS ===================== */}
        <CardTitle>Informações gerais</CardTitle>
        <Separator className="my-3" />
        <div className="flex gap-1 mb-4">
          <div className="box">
            <label>Id</label>
            {/* Campo somente leitura (não precisa de onChange) */}
            <Input
              value={dadosMeioPgto.id}
              className="w-12 bg-slate-300"
              disabled
            />
          </div>
          <div className="ml-4">
            <label>Descrição</label>
            <Input
              // Valor: Prioriza o que foi editado em novoDadosMeioPgto,
              // se não houver, exibe o valor original de dadosMeioPgto
              value={
                novoDadosMeioPgto.descricao ??
                dadosMeioPgto.descricao ??
                ""
              }
              onChange={(evt) => handleChange("descricao", evt.target.value)}
              className="w-72"
            />
          </div>
        </div>
        <Separator className="my-3" />

        {/* =============== CONFIGURAÇÕES ====================== */}
        <CardTitle className="my-3">Configurações</CardTitle>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Select
            // Mesma lógica: prioriza o que foi editado, senão usa o valor original
            value={
              novoConfigDadosMeioPgto.stringValue ??
              configDadosMeioPgto[0]?.stringValue ??
              ""
            }
            onValueChange={(value) => handleChange("stringValue", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Sim</SelectItem>
              <SelectItem value="N">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </CardContent>
    </form>
  );
});

ConfigsMeioPagamento.displayName = "ConfigsMeioPagamento";

export default ConfigsMeioPagamento;
