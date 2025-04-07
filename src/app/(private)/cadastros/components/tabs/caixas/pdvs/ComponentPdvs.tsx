"use client"

import { useFetchAllCaixas, useFetchByIdCaixa } from "../../../../hooks/useCaixa";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { TypeCaixas } from "../../../../types/typesCaixas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import { SearchComponent } from "@/components/shared/searchComponent";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, CirclePlus, EllipsisVertical, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GridRowSelectionModel} from "@mui/x-data-grid";
import { useModalStore } from "@/store/useModalStore";
import { ExportButtonPro } from "@/components/shared/exportCsvButton";
import PdvsMock from "./mock.json"
import { getCaixasColumns } from "./columns";
import mockdata from "./mock2.json"

const ComponentPdvs = () => {
    // STATES
    const [selectedIdCaixa, setSelectedIdCaixa] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState<TypeCaixas| undefined>(undefined);
    const [showModalIncluiCaixa, setShowModalIncluiCaixa] = useState(false);
    const { openEnviarConfig } = useModalStore(); // Modal Global

    
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

    
    const handleOpenModal = (row: TypeCaixas) => {
    setSelectedIdCaixa(String(row.id));
  };

  const caixasColumns = getCaixasColumns(handleOpenModal);
  
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
              rows={PdvsMock} 
              columns={caixasColumns}
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleLinhas}
            />

            {/* =================================================== */}
            {/* =============== BUTTONS FUNCOES =================== */}
            {/* =================================================== */}
            <div className="flex justify-between gap-2"> 
              <Button onClick={() => setShowModalIncluiCaixa(true)}><CirclePlus/>Incluir</Button>
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
                  <ExportButtonPro rows={PdvsMock}>Excel</ExportButtonPro>
                </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>


              {/* =================================================== */}
              {/* ================ MODAL INCLUIR CAIXA ============== */}
              {/* =================================================== */}
              {showModalIncluiCaixa && (
                <Modal onClose={() => setShowModalIncluiCaixa(false)}style={{ width: "350px" }}>
                  <Card className="h-10">
                  </Card>
                </Modal>
              )}

        </div>
    )
}




export default ComponentPdvs;