// src/client/components/PageFrenteCaixa.tsx

"use client";

import { useState, useEffect } from "react";
import api from "@/api/api"; // Instância com interceptor configurado
import { MeioPgto, ConfiguracaoMeioPag } from "./types";
import { meioPgtoColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal"; // Componente de Modal
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./configMeioPag/configMeioPagamento";
import { Form } from "@/components/ui/form";

export default function PageFrenteCaixa() {
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
  

  console.log(meio)
  console.log(configModal)


  // ============= ABRIR MODAL ==============
  function handleVerConfig(configs: ConfiguracaoMeioPag[]) {
    setConfigModal(configs);

    const initialConfigValues: Record<number, any> = {};
    configs.forEach(config =>{
      initialConfigValues[config.id] = config.id
    });
    setConfigValues(initialConfigValues);
    setShowModal(true);
  }

  // ====== LIDAR COM MUDANÇAS NOS INPUTS =========
  function handleInputChange(configId: number, value: any){
    setConfigValues(prev =>({
      ...prev,
      [configId]: value,
    }))
  }

  return (
    <div className="p-4">
      {/* // ============================================== */}
      {/* // =================== TABELA =================== */}
      <h1 className="text-2xl mb-4">Tabela</h1>
      {loading ? (
        <p>Carregando dados...</p>
      ) : meio ? (
        // =========== TABLE COMPONENT ===========
        <DataTable
          columns={meioPgtoColumns}
          data={[meio]}
          onRowClick={(rowData) => handleVerConfig(rowData.configuracao)}
        />
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}

      {/* ====================================================== */}
      {/* ============= MODAL COM AS CONFIGURAÇÕES ============= */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* Card do Cabeçalho (fixo) */}
          <div className="sticky top-0 z-10 bg-white shadow-md">
            <h2 className="text-xl font-semibold">
              Meio de Pagamento {meio?.descricao || "Selecionado"}
            </h2>
            <p className="text-gray-600">
              Configurações do meio de pagamento {meio?.descricao || "Selecionado"}
            </p>
          </div>

          {/* Área de Conteúdo Rolável */}
          <div className="flex-1 overflow-auto my-4">
            {/* Card do Meio */}
            <div className="bg-white shadow-md p-4 rounded">
              <ConfigsMeioPagamento />
            </div>
          </div>

          {/* Botões (fixos) */}
          <div className="sticky bottom-0 z-10 bg-white shadow-md flex justify-between p-4">
            <Button onClick={() => setShowModal(false)} variant={"destructive"}>
              Fechar
            </Button>
            <Button variant={"default"} type="submit">Salvar</Button>
          </div>
        </Modal>
      )}


    </div>
  );
}
