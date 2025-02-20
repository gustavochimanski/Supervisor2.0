"use client";

import React, { useRef, useState } from "react";
import { MeioPgto, ConfiguracaoMeioPag } from "./types";
import { meioPgtoColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./configMeioPag/configMeioPagamento";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchComponent } from "@/components/shared/searchComponent";
import { useFetchByIdMeioPgto } from "./useMeioPag";

export default function ComponentMeioPagamento() {
  const [showModal, setShowModal] = useState(false);
  const [idSelected, setIdSelected] = useState<string>("1");
  const formRef = useRef<any>(null);

  // Busca todos os meios de pagamento
  // const { data: allMeios, isLoading: isLoadingAll } = useFetchAllMeiosPgto();

  // Busca um meio de pagamento específico pelo ID
  const { data: dataByIdMeiopgto, isLoading } = useFetchByIdMeioPgto(idSelected);

  // Abre o modal e define o id do meio selecionado para buscar detalhes
  function handleVerConfig(configs: ConfiguracaoMeioPag[], id: string) {
    setIdSelected(id);
    setShowModal(true);
  }

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  if (isLoading) {
    return <p>Carregando dados...</p>;
  }
  return (
    <div>
      {/* =============== CONTAINER TOPO ============== */}
      <div className="flex w-full justify-between text-white mb-4 gap-4 text-center">
        <div>
          <SearchComponent className="w-full md:w-60" />
        </div>
        <div className="my-4 flex gap-2">
          <Button variant="outline">Incluir</Button>
          <Button variant="outline">Atualizar</Button>
          <Button variant="destructive">Deletar</Button>
        </div>
      </div>

      {/* ========== TABELA ============ */}
      <DataTable
        columns={meioPgtoColumns}
        data={dataByIdMeiopgto ? [dataByIdMeiopgto] : []}
        onRowClick={(rowData: any) =>
          handleVerConfig(rowData.configuracao, rowData.id)
        }
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)} style={{ width: "80vw", height: "70vh" }}>
          {/* ===== CABECALHO ===== */}
          <CardHeader>
            <CardTitle>
              Meio de Pagamento {dataByIdMeiopgto?.descricao || "Selecionado"}
            </CardTitle>
            <CardDescription>
              Configurações do meio de pagamento {dataByIdMeiopgto?.descricao || "Selecionado"}
            </CardDescription>
          </CardHeader>

          {/* ===== CONTEÚDO ===== */}
          <CardContent className="h-[50vh] overflow-auto mb-6">
            <ConfigsMeioPagamento ref={formRef} />
          </CardContent>

          {/* ===== RODAPÉ ===== */}
          <CardFooter className="justify-center gap-4">
            <Button onClick={() => setShowModal(false)} variant="outline">Fechar</Button>
            <Button type="submit" onClick={handleSave} variant="gradient">Salvar</Button>
          </CardFooter>
        </Modal>
      )}
    </div>
  );
}
