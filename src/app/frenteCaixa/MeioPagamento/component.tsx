"use client";

import React, { useRef, useState, useEffect } from "react";
import api from "@/api/api";
import { MeioPgto, ConfiguracaoMeioPag } from "./types";
import { meioPgtoColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./configMeioPag/configMeioPagamento";

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
    <div className="p-4">
      <h1 className="text-2xl mb-4">Tabela</h1>
      {loading ? (
        <p>Carregando dados...</p>
      ) : meio ? (
        <DataTable
          columns={meioPgtoColumns}
          data={[meio]}
          onRowClick={(rowData) => handleVerConfig(rowData.configuracao)}
        />
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)} style={{width: "80vh"}}>
          <div className="sticky top-0 z-10 bg-[var(--foreground)] rounded-[var(--radius)] shadow-md  p-4">
            <h2 className="text-xl font-semibold">
              Meio de Pagamento {meio?.descricao || "Selecionado"}
            </h2>
            <p className="text-gray-600">
              Configurações do meio de pagamento {meio?.descricao || "Selecionado"}
            </p>
          </div>

          <div className="flex-1 overflow-auto my-4">
            <ConfigsMeioPagamento ref={formRef} />
          </div>

          <div className="sticky bottom-0 z-10 bg-white shadow-md flex justify-between p-4">
            <Button onClick={() => setShowModal(false)} variant={"destructive"}>
              Fechar
            </Button>
            <Button onClick={handleSave} variant={"default"}>
              Salvar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
  