"use client";


import React, { useEffect, useRef, useState } from "react";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./Modal/Modal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchComponent } from "@/components/shared/searchComponent";
import { useFetchByIdMeioPgto, useIncluiMeioPgto } from "./useMeioPag";
import {  ArrowRightCircle, Barcode, CirclePlus, CircleX, EllipsisVertical, Plus, RefreshCcw, Save, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DataTableComponentMui from "@/components/shared/mui-data-table";
import ConfirmModal from "@/components/shared/modalConfirm";
import { GridColDef } from '@mui/x-data-grid';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ComponentMeioPagamento() {
  // ==== MODAIS ======
  const [showModalById, setShowModalById] = useState(false);
  const [showModalIncluirMpgto, setShowModalIncluirMpgto] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  // States
  const [idSelected, setIdSelected] = useState<string>("1");

  // REFERENCIA SUBMIT
  const formRef = useRef<any>(null);

  // DATAS
  const { data: dataByIdMeiopgto, isLoading, refetch: refetchByIdMeioPgto } = useFetchByIdMeioPgto(idSelected);
  // const { data: allMeios, isLoading: isLoadingAll } = useFetchAllMeiosPgto();
  // MUTATES
  // const { mutate: deletePerfil } = useDelPerfil();
  const {mutate: mutateIncluiMeioPgto, error: erroIncluirMpgto} = useIncluiMeioPgto();

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'descricao', headerName: 'Descrição', width: 300},
    {field: 'tipoMeioPgto', headerName: 'Tipo', width: 70}
  ]

  // Abre o modal e define o id do meio selecionado para buscar detalhes
  function handleVerConfig(configs: ConfiguracaoMeioPag) {
    console.log(configs)
    console.log(configs.id)
    setIdSelected(configs.id.toString());
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
  const handleDeletePerfil = (id?: string) => {
    setShowModalConfirm(true)
    if (!id) {
      console.log("ID inválido para deleção", id);
      return;
    }
    setShowModalConfirm(false)
    setShowModalById(false);
  };

  // =========================================================================
  // ======================= INCLUI MEIO DE PAGAMENTO ========================
  // =========================================================================
  const [newMeioPgtoPayload, setNewMeioPgtoPayload] = useState<Pick<MeioPgto, 'codigo' | 'descricao' | 'tipoMeioPgto'>>({
    codigo: '',
    descricao: '',
    tipoMeioPgto: '',
  });
  const handleIncluiPerfil = () => {
    mutateIncluiMeioPgto(newMeioPgtoPayload)
   
  };


  // LOADING
  if (isLoading) {
    return <p>Carregando dados...</p>;
  }
  return (
    <div>
      {/* =============== CONTAINER TOPO ============== */}
      <div className="flex flex-col md:flex-row w-full justify-between mb-4 gap-4 text-center">
        {/* =================================================== */}
        {/* ==================== PESQUISAR  =================== */}
        {/* =================================================== */}
        <div>
          <SearchComponent className="w-full md:w-60" />
        </div>
        {/* =================================================== */}
        {/* =============== BUTTONS FUNCOES =================== */}
        {/* =================================================== */}
        <div className="flex justify-between gap-2"> 
          <Button onClick={() => setShowModalIncluirMpgto(true)}><CirclePlus/>Incluir</Button>
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

      {/* =================================================== */}
      {/* ====================== TABELA ===================== */}
      {/* =================================================== */}
      <DataTableComponentMui 
        rows={dataByIdMeiopgto ? [dataByIdMeiopgto!]: []} 
        columns={columns}
        onRowClick={(rowData: any) =>
          handleVerConfig(rowData)
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
      {/* =================================================== */}
      {/* ============== MODAL INCLUIR MEIOPGTO ============= */}
      {/* =================================================== */}
      {showModalIncluirMpgto && (
        <Modal onClose={() => setShowModalIncluirMpgto(false)} style={{ width: "350px" }}>
          <CardHeader className="text-center">
            <CardTitle>Incluir Novo Perfil</CardTitle>
          </CardHeader>
          <CardContent className="p-10 gap-4 flex flex-col">
            {/* CODIGO */}
            <div>
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                type="text"
              
                onChange={(e) => setNewMeioPgtoPayload((prev) => ({
                  ...prev, codigo: e.target.value
                }))}
                value={newMeioPgtoPayload.codigo}
              />
            </div>
            {/* DESCRIÇÃO */}
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                type="text"
                onChange={(e) => setNewMeioPgtoPayload((prev) => ({
                  ...prev, descricao: e.target.value
                }))}
                value={newMeioPgtoPayload.descricao}
              />
            </div>
            {/* TIPO MEIO PGTO */}
            <div>
              <Label htmlFor="tipoMeioPgto">Tipo</Label>
              <Select
                value={newMeioPgtoPayload.tipoMeioPgto}
                onValueChange={(e) => setNewMeioPgtoPayload((prev) => ({
                  ...prev, tipoMeioPgto: e
                }))}
              >
                <SelectTrigger className="md:w-1/2" id="CartaoDigitado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="D">Dinheiro</SelectItem>
                  <SelectItem value="C">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          {erroIncluirMpgto && ((erroIncluirMpgto as any)?.response?.data?.errors?.[0]?.message)}

          {/* BUTTONS */}
          <CardFooter className="justify-between mt-4">
            <Button variant="destructive" onClick={() => setShowModalIncluirMpgto(false)}>
              Fechar
            </Button>
            <Button onClick={() => handleIncluiPerfil()}>Salvar</Button>
          </CardFooter>
        </Modal>
      )}
    </div>
  );
}
