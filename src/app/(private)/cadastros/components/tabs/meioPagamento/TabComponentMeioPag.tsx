"use client";


import React, { useRef, useState } from "react";
import { ConfiguracaoMeioPag } from "@/app/(private)/cadastros/types/typesMeioPag";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./config/MAIN";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchComponent } from "@/components/shared/searchComponent";
import { useFetchAllMeiosPgto, useFetchByIdMeioPgto, useIncluiMeioPgto } from "../../../hooks/useMeioPag";
import {  ArrowRightCircle, Barcode, CircleCheck, CirclePlus, CircleX, EllipsisVertical, RefreshCcw,  Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import ConfirmModal from "@/components/shared/modals/modalConfirm";
import { GridColDef } from '@mui/x-data-grid';
import { getErrorMessage } from "@/lib/getErrorMessage";
import { toast } from "sonner";
import FormIncluirMeioPgto, {FormData} from "@/app/(private)/cadastros/schemas/formIncluiMpgto";

export default function TabComponentMeioPagamento() {
  // ==== MODAIS ======
  const [showModalById, setShowModalById] = useState(false);
  const [showModalIncluirMpgto, setShowModalIncluirMpgto] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  // Estados do componente principal
  const [idSelected, setIdSelected] = useState<string>("1");
  const [error, setError] = useState(false);

  // Estados para o formulário de inclusão
  const [incluirFormData, setIncluirFormData] = useState<FormData>({
    descricao: "",
    tipoMeioPgto: "",
  });

  // REFERENCIA SUBMIT (para modal de configurações)
  const formRef = useRef<any>(null);

  // DATAS
  const { data: dataByIdMeiopgto, isLoading, refetch: refetchByIdMeioPgto } = useFetchByIdMeioPgto(idSelected);
  const {data: dataAllMeioPgto} = useFetchAllMeiosPgto()

  // MUTATES
  const { mutateAsync } = useIncluiMeioPgto();

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 50},
    {field: 'descricao', headerName: 'Descrição', width: 300},
    {field: 'tipoMeioPgto', headerName: 'Tipo', width: 70}
  ]

  // Abre o modal e define o id do meio selecionado para buscar detalhes
  function handleVerConfig(configs: ConfiguracaoMeioPag) {
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
  // NÃO IMPLEMENTADO, INDISPONÍVEL NA API
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

  const handleIncluiPerfil = async () => {
    try {
      setError(false);
      await mutateAsync(incluirFormData);
    
      toast.success("Meio de pagamento incluído com sucesso!");
    } catch (error) {
      setError(true);
      const message = getErrorMessage(error) ?? "Erro ao incluir meio de pagamento.";
      toast.error(message);
      console.error("Erro ao incluir meio de pagamento:", error);
    }
  };




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
        rows={dataAllMeioPgto || []} 
        columns={columns}
        onRowClick={(rowData: any) => handleVerConfig(rowData)}
      />
      
      {/* =================================================== */}
      {/* ============= MODAL CONFIGURAÇÕES ================= */}
      {/* =================================================== */}
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
            <ConfigsMeioPagamento ref={formRef} idMeioPgto={idSelected} />
          </CardContent>
          {/* =================================================== */}
          {/* ===================== RODAPÉ ====================== */}
          {/* =================================================== */}
          <CardFooter className="justify-center gap-4">
            <Button type="submit" onClick={handleSave} ><CircleCheck/>Salvar</Button>
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
          <FormIncluirMeioPgto
            formData={incluirFormData}
        
            onChange={(field, value) => setIncluirFormData((prev) => ({ ...prev, [field]: value }))}
            onSubmit={handleIncluiPerfil}
            onClose={() => setShowModalIncluirMpgto(false)}
          />
        </Modal>
      )}
    </div>
  );
}
