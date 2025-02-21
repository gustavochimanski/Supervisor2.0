"use client";


import React, { useEffect, useRef, useState } from "react";
import { ConfiguracaoMeioPag, MeioPgto } from "./types";
import { meioPgtoColumns } from "./columns";
import { DataTable } from "@/components/shared/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ConfigsMeioPagamento from "./configMeioPag/configMeioPagamento";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchComponent } from "@/components/shared/searchComponent";
import { useFetchByIdMeioPgto } from "./useMeioPag";
import { ArrowRight, ArrowRightCircle, Barcode, CirclePlus, CircleX, EllipsisVertical, Plus, RefreshCcw, Save, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  // ================================================================= 
  // ===================== APAGA MEIO PAGAMENTO POR ID =======================
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
        <div className="my-4 flex justify-between gap-2"> 
          <Button><CirclePlus/> Inserir</Button>
          <Button variant="secondary"><RefreshCcw />Atualizar</Button>
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

      {/* ========== TABELA ============ */}
      <DataTable
        columns={meioPgtoColumns}
        data={dataByIdMeiopgto ? [dataByIdMeiopgto] : []}
        onRowClick={(rowData: any) =>
          handleVerConfig(rowData.configuracao, rowData.id)
        }
      />

      {showModalById && (
        <Modal onClose={() => setShowModalById(false)} style={{ width: "80vw", height: "70vh" }}>
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
            <Button type="submit" onClick={handleSave} ><Save/>Salvar</Button>
            <Button onClick={() => setShowModalById(false)} variant="outline"><CircleX/>Fechar</Button>
            <Button onClick={() => handleDeletePerfil()} variant="destructive"><Trash2/> Apagar</Button>
          </CardFooter>



          {/* ===== Confirmation Modal for Deletion ===== */}
          {showModalConfirm && (
            <Modal onClose={() => setShowModalConfirm(false)} style={{ width: "350px", textAlign: "center" }}>
              <Card>
                <CardHeader>
                  <CardTitle>Tem certeza que deseja apagar o perfil?</CardTitle>
                  <CardDescription>Atenção! Todas as informações serão perdidas!</CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-4 justify-center">
                  <Button
                    onClick={() => handleDeletePerfil(dataByIdMeiopgto?.id.toString())}
                    variant="destructive"
                  >
                    Confirmar
                  </Button>
                  <Button onClick={() => setShowModalConfirm(false)} >
                    Cancelar
                  </Button>
                </CardFooter>
              </Card>
            </Modal>
          )}
        </Modal>
    
      )}  
    </div>
  );
}
