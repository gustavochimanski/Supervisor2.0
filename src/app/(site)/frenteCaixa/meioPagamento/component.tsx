"use client";

import React, { useRef, useState, useEffect } from "react";
import api from "@/api/api";
import { MeioPgto, ConfiguracaoMeioPag } from "./types";
import { meioPgtoColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./configMeioPag/configMeioPagamento";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComponentMeioPagamento() {
  const [meio, setMeio] = useState<MeioPgto | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<any>(null); // Referência para o formulário

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/v1/config/meiospgto/1");
        setMeio(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setMeio(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleVerConfig(configs: ConfiguracaoMeioPag[]) {
    setShowModal(true);
  }

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <div>
      {loading ? (
        <p>Carregando dados...</p>
      ) : meio ? (
        <DataTable
          columns={meioPgtoColumns}
          data={[meio]}
          onRowClick={(rowData: any) => handleVerConfig(rowData.configuracao)}
        />
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)} style={{width: "80vw", height: "70vh"}}>
          <Card>
            {/* ===== CABECALHO ===== */}
            <CardHeader>
                <CardTitle>Meio de Pagamento {meio?.descricao || "Selecionado"} </CardTitle>
                <CardDescription>Configurações do meio de pagamento {meio?.descricao || "Selecionado"}</CardDescription>
            </CardHeader>

            {/* ===== CONTEUDO ===== */}
            <CardContent className="h-[50vh] overflow-auto">
              <ConfigsMeioPagamento ref={formRef} />
            </CardContent>

            {/* ===== RODAPÉ ===== */}
            <CardFooter className="justify-between">
              <Button onClick={() => setShowModal(false)} variant="outline">
                Fechar
              </Button>
              <Button onClick={handleSave} variant={"default"}>
                Salvar
              </Button>
            </CardFooter>
          
          </Card>
        </Modal>
      )}

      {/* ================== BUTTON RODAPÉ ================== */}
      <div className="fixed flex bottom-0  w-full text-white p-4 gap-4 text-center ">
          <Button>Incluir</Button>
          <Button>Atualizar</Button>
          <Button variant={"destructive"}>Deletar</Button>
      </div>
    </div>
  );
}
  