"use client"
import { useFetchAllCaixas, useFetchByIdCaixa } from "../../../hooks/useCaixa";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { TypeCaixas } from "../../../types/typesCaixas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import { SearchComponent } from "@/components/shared/searchComponent";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Barcode, CirclePlus, EllipsisVertical, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GridColDef, GridRowSelectionModel, useGridApiRef } from "@mui/x-data-grid";
import { useModalStore } from "@/stores/useModalStore";
import { ExportButtonPro } from "@/components/shared/exportCsvButton";
import perfisPdvs from "./mock.json"

const ComponentCaixas = () => {
    // STATES
    const [selectedIdCaixa, setSelectedIdCaixa] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState<TypeCaixas| undefined>(undefined);
    const [showModalCaixas, setShowModalCaixas] = useState(false);
    const { openEnviarConfig } = useModalStore(); // Modal Global

    // MODALS
    const [showModalByIdCaixa, setShowModalByIdCaixa] = useState(false);

    const caixasColumns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 50, align: "center", headerAlign: 'center'},
      { field: 'descricao', headerName: 'Descrição', width: 300, align: "left", headerAlign: 'left', editable: true},
      { field: 'empresaId', headerName: 'Empresa', width: 150 },
    ];

    // FETCHING DATA
    const {data: dataAllCaixas, refetch: refetchAllCaixas} = useFetchAllCaixas();
    const {data: dataByIdCaixa} = useFetchByIdCaixa(selectedIdCaixa);
    

    const handleLinhas = (idsLinhas: GridRowSelectionModel) => {
      console.log(idsLinhas)
    }
    
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target;
  
      setFormData((prev) => {
        if (!prev) return prev;
  
        // Atualiza o campo 'descricao'
        if (name === "descricao") {
          return { ...prev, descricao: value };
        }
  
        return prev;
      });
    };

    const handleRowClick = (row: TypeCaixas) => {
    setSelectedIdCaixa(String(row.id));
    setShowModalByIdCaixa(false);
  };

    return(
        <div className="flex flex-col h-full">
          {/* =============== CONTAINER TOPO ============== */}
          <div className="flex flex-col md:flex-row w-full justify-between mb-4 gap-4 text-center">
            {/* =================================================== */}
            {/* ==================== PESQUISAR  =================== */}
            {/* =================================================== */}
            <div>
              <SearchComponent className="w-full md:w-60" />
            </div>
          </div>
            {/* =================================================== */}
            {/* ====================== TABELA ===================== */}
            {/* =================================================== */}
            <DataTableComponentMui 
              rows={perfisPdvs} 
              columns={caixasColumns}
              onRowClick={handleRowClick}
              onRowSelectionModelChange={handleLinhas}
            />

            {/* =================================================== */}
            {/* =============== BUTTONS FUNCOES =================== */}
            {/* =================================================== */}
            <div className="flex justify-between gap-2"> 
              <Button onClick={() => setShowModalCaixas(true)}><CirclePlus/>Incluir</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"secondary"} ><EllipsisVertical/>Mais</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Opções</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => refetchAllCaixas()}>
                    <RefreshCcw />Atualizar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={openEnviarConfig}>
                    <ArrowRightCircle />Enviar Configuração
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExportButtonPro rows={perfisPdvs}>Excel</ExportButtonPro>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>





              {/* =================================================== */}
              {/* ============== MODAL INCLUIR MEIOPGTO ============= */}
              {/* =================================================== */}
              {showModalCaixas && (
                <Modal onClose={() => setShowModalCaixas(false)}style={{ width: "350px" }}>
                  <Card className="h-10">
                  </Card>
                </Modal>
              )}

            {showModalByIdCaixa && 
             <Modal onClose={() => setShowModalByIdCaixa(false)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Configurações</CardTitle>
                        <CardDescription>Caixa {dataByIdCaixa? dataByIdCaixa.descricao : "Carregando..."}</CardDescription>
                    </CardHeader>

                    <CardContent>
                    <form className="flex flex-wrap my-4 gap-4">
                    <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={dataByIdCaixa?.descricao || ""}
                    onChange={handleChange}
                    className="w-60"
                  />
                </div>
                    <div>
                  <Label htmlFor="empresaId">Empresa</Label>
                  <Input
                    type="text"
                    id="empresaId"
                    name="empresaId"
                    value={dataByIdCaixa?.empresaId || ""}
                    onChange={handleChange}
                    className="w-60"
                  />
                </div>
                <Separator/>
                   <CardTitle>Perfil Pdv</CardTitle>
                   <div className="flex gap-4 items-center">
                   <Label htmlFor="descPerfil">Descrição Perfil</Label>
                  <Input
                    type="text"
                    id="descPerfil"
                    name="descricao"
                    value={dataByIdCaixa?.perfilPdv.descricao || ""}
                    onChange={handleChange}
                    className="w-60"
                  />
                   </div>
                    </form>
                    </CardContent>
                </Card>
             </Modal>}
        </div>
    )
}




export default ComponentCaixas;