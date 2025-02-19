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
import { SearchComponent } from "@/components/shared/searchComponent";
import { useFetchAllMeiosPgto, useFetchByIdMeioPgto } from "./useMeioPag";

export default function ComponentMeioPagamento() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [meio, setMeio] = useState<MeioPgto | undefined>(undefined);
  const [idSelected, setIdSelected] = useState("1"); // Define "1" já como valor inicial
  const formRef = useRef<any>(null); // Referência para o formulário
  
  // Chama o hook com o idSelected
  const { data: dataByIdMeiopgto, isLoading } = useFetchByIdMeioPgto(idSelected);
  
  // useEffect para atualizar o estado 'meio' quando os dados forem carregados
  useEffect(() => {
    if (dataByIdMeiopgto) {
      setMeio(dataByIdMeiopgto);
    }
  }, [dataByIdMeiopgto]);
  
  // Se necessário, você pode controlar o estado 'loading' com base no status do hook:
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  

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
        <>
        {/* =============== PESQUISA ============== */}
        <SearchComponent></SearchComponent>
        {/* ========== TABELA ============ */}
        <DataTable
          columns={meioPgtoColumns}
          data={[meio]}
          onRowClick={(rowData: any) => handleVerConfig(rowData.configuracao)}
        />
        {/* ================== BUTTON RODAPÉ ================== */}
        <div className="fixed flex bottom-0  w-full text-white mb-4 gap-4 text-center ">
            <Button variant={"outline"}>Incluir</Button>
            <Button variant={"outline"}>Atualizar</Button>
            <Button variant={"destructive"}>Deletar</Button>
        </div>
      </>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)} style={{width: "80vw", height: "70vh"}}>
          <Card>
            {/* ===== CABECALHO ===== */}
            <CardHeader>
                <CardTitle>Meio de Pagamento {dataByIdMeiopgto?.descricao || "Selecionado"} </CardTitle>
                <CardDescription>Configurações do meio de pagamento {dataByIdMeiopgto?.descricao || "Selecionado"}</CardDescription>
            </CardHeader>

            {/* ===== CONTEUDO ===== */}
            <CardContent className="h-[50vh] overflow-auto">
              <ConfigsMeioPagamento ref={formRef} />
            </CardContent>

            {/* ===== RODAPÉ ===== */}
            <CardFooter className="justify-center gap-4">
              <Button onClick={() => setShowModal(false)} variant="outline">
                Fechar
              </Button>
              <Button onClick={handleSave} variant={"gradient"}>
                Salvar
              </Button>
            </CardFooter>
          
          </Card>
        </Modal>
      )}


    </div>
  );
}
  