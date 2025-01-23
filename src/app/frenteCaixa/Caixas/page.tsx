// src/client/components/PageFrenteCaixa.tsx

"use client";

import { useState, useEffect } from "react";
import api from "@/api/api"; // Instância com interceptor configurado
import { MeioPgto, Configuracao } from "./types";
import { meioPgtoColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal"; // Componente de Modal
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PageFrenteCaixa() {
  const [meio, setMeio] = useState<MeioPgto | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados para o Modal
  const [showModal, setShowModal] = useState(false);
  const [configModal, setConfigModal] = useState<Configuracao[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/v1/config/meiospgto/1");
        setMeio(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar dados:", err);
        setMeio(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Função para abrir o modal
  function handleVerConfig(configs: Configuracao[]) {
    setConfigModal(configs);
    setShowModal(true);
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
          <Card>

            {/* =============== CABECALHO =============== */}
            <CardHeader>
              <CardTitle>Meio de Pagamento {"Dinheiro"} </CardTitle>
              <CardDescription>Configurações do meio de pegamento {"Dinheiro"} </CardDescription>
            </CardHeader>

            {/* ================== CONTEÚDO ================== */}
            <CardContent>
              <span>{"Label"}</span>
              <Input value="Valor" ></Input>
            </CardContent>
  
          </Card>
          
          {/* =============== BOTÕES ================ */}
          <div className="flex mt-4 justify-between">
            <Button onClick={() => setShowModal(false)} variant={"destructive"}>Fechar</Button>
            <Button variant={"default"}>Salvar</Button>
          </div>
          
        </Modal>
      )}
    </div>
  );
}
