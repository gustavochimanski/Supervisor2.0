"use client"

import { useEffect, useState } from "react";
import { ConfiguracaoMeioPag, MeioPgto } from "../types";
import api from "@/api/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent } from "@/components/ui/card";
import { configMap } from "./entities";


const ConfigsMeioPagamento = () =>{

    const [meio, setMeio] = useState<MeioPgto | null>(null);
    const [loading, setLoading] = useState(true);
    const [configValues, setConfigValues] = useState<Record<number, any>>({});
  
    // Estados para o Modal
    const [showModal, setShowModal] = useState(false);
    const [configModal, setConfigModal] = useState<ConfiguracaoMeioPag[]>([]);
  
    // ====================================
    // ============== API =================
    useEffect(() => {
      let isMounted = true; // Flag para rastrear se o componente está montado
      
      async function fetchData() {
        try {
          const response = await api.get("/v1/config/meiospgto/1");
          if (isMounted) {
            setMeio(response.data);
            setConfigModal(response.data.configuracao);
          }
        } catch (err: any) {
          if (isMounted) {
            console.error("Erro ao buscar dados:", err);
            setMeio(null);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
      fetchData();
      
      return () => {
        isMounted = false; // Limpeza da flag na desmontagem
      };
    }, []);


    function handleInputChange(configId: number, value: any) {
      const property = configMap[configId]?.property; // Obtém a propriedade correspondente
    
      setConfigValues((prev) => ({
        ...prev,
        [configId]: value, // Atualiza o estado do valor
      }));
    
      // Atualiza a configuração original (opcional)
      if (meio) {
        setMeio({
          ...meio,
          configuracao: meio.configuracao.map((config) =>
            config.id === configId
              ? { ...config, [property]: value } // Atualiza a propriedade correta
              : config
          ),
        });
      }
    }
    
    return(
      <CardContent>
        {configMap.map((config) => (
          <div key={config.id} className="mb-4">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700">
              {config.label}
            </label>

            {/* Select */}
            <Select
              value={configValues[config.id] || ""}
              onValueChange={(value) => handleInputChange(config.id, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {config.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>

    )
}


export default ConfigsMeioPagamento;