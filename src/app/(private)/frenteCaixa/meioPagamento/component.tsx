"use client";


import React, { useEffect, useRef, useState } from "react";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";
import { meioPgtoColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./Modal/Modal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchComponent } from "@/components/shared/searchComponent";
import { useFetchByIdMeioPgto } from "./useMeioPag";
import {  ArrowRightCircle, Barcode, CirclePlus, CircleX, EllipsisVertical, Plus, RefreshCcw, Save, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DataTableComponent from "@/components/shared/mui-data-table";
import ConfirmModal from "@/components/shared/modalConfirm";

export default function ComponentMeioPagamento() {
  // ==== MODAIS ======
  const [showModalById, setShowModalById] = useState(false);
  const [showModalIncluirPerfil, setShowModalIncluirPerfil] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [idSelected, setIdSelected] = useState<string>("1");
  const formRef = useRef<any>(null);

  // Busca todos os meios de pagamento
  // const { data: allMeios, isLoading: isLoadingAll } = useFetchAllMeiosPgto();

  // Busca um meio de pagamento específico pelo ID
  const { data: dataByIdMeiopgto, isLoading, refetch: refetchByIdMeioPgto } = useFetchByIdMeioPgto(idSelected);
;

  // Abre o modal e define o id do meio selecionado para buscar detalhes
  function handleVerConfig(configs: ConfiguracaoMeioPag[], id: string) {
    setIdSelected(id);
    setShowModalById(true);
  }

  // CALLBACK DO BUTTON PARA SALVAR OS DADOS
  const handleSave = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  // =========================================================================
  // ===================== APAGA MEIO PAGAMENTO POR ID =======================
  // =========================================================================
  // const { mutate: deletePerfil } = useDelPerfil();
  const handleDeletePerfil = (id?: string) => {
    setShowModalConfirm(true)
    if (!id) {
      console.log("ID inválido para deleção", id);
      return;
    }
    setShowModalConfirm(false)
    setShowModalById(false);
  };
  
  // LOADING
  if (isLoading) {
    return <p>Carregando dados...</p>;
  }
  return (
    <div>
      {/* =============== CONTAINER TOPO ============== */}
      <div className="flex flex-col md:flex-row w-full justify-between mb-4 gap-4 text-center">
        <div>
          <SearchComponent className="w-full md:w-60" />
        </div>
        <div className="flex justify-between gap-2"> 
          <Button><CirclePlus/> Inserir</Button>
          <Button variant="secondary" onClick={() => refetchByIdMeioPgto()}><RefreshCcw />Atualizar</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"} ><EllipsisVertical/>Mais</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
                <ArrowRightCircle/>
                <a href="/">Carga</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Barcode/>
                <a href="/">Etiquetas</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* <DataTableComponent/> */}

      {/* =================================================== */}
      {/* ====================== TABELA ===================== */}
      {/* =================================================== */}
      <DataTable
        columns={meioPgtoColumns}
        data={dataByIdMeiopgto ? [dataByIdMeiopgto] : []}
        onRowClick={(rowData: any) =>
          handleVerConfig(rowData.configuracao, rowData.id)
        }
      />

      {showModalById && (
        <Modal onClose={() => setShowModalById(false)} style={{ width: "80vw", height: "70vh" }}>
          {/* =================================================== */}
          {/* ==================== CABECALHO ==================== */}
          {/* =================================================== */}
          <CardHeader>
            <CardTitle>Meio de Pagamento {dataByIdMeiopgto?.descricao || "Selecionado"}</CardTitle>
            <CardDescription>Configurações de meio de pagamento</CardDescription>
          </CardHeader>

          {/* =================================================== */}
          {/* ============== CONTEÚDO (COMPONENTS) ============== */}
          {/* =================================================== */}
          <CardContent className="h-[50vh] overflow-auto mb-6">
            <ConfigsMeioPagamento ref={formRef} />
          </CardContent>
          {/* =================================================== */}
          {/* ===================== RODAPÉ ====================== */}
          {/* =================================================== */}
          <CardFooter className="justify-center gap-4">
            <Button type="submit" onClick={handleSave} ><Save/>Salvar</Button>
            <Button onClick={() => setShowModalById(false)} variant="outline"><CircleX/>Fechar</Button>
            <Button onClick={() => handleDeletePerfil()} variant="destructive"><Trash2/> Apagar</Button>
          </CardFooter>


          {/* =================================================== */}
          {/* ============ MODAL CONFIRMAÇÃO DELETE  ============ */}
          {/* =================================================== */}
          {showModalConfirm && (
            <ConfirmModal
              isOpen={showModalConfirm}
              title="Tem certeza que deseja apagar o perfil?"
              description="Atenção! Todas as informações serão perdidas!"
              onClose={() => setShowModalConfirm(false)}
              onConfirm={() => handleDeletePerfil(dataByIdMeiopgto?.id.toString())}
              confirmLabel="Confirmar"
              cancelLabel="Cancelar"
            />
          )}
        </Modal>
    
      )}  
    </div>
  );
}
