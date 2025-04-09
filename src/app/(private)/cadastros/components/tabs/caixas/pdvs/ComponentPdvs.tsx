"use client"

import { useFetchAllCaixas, useFetchByIdCaixa } from "../../../../hooks/useCaixa";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Card } from "@/components/ui/card";
import { TypeCaixas } from "../../../../types/typesCaixas";
import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import { SearchComponent } from "@/components/shared/searchComponent";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, CirclePlus, EllipsisVertical, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GridRowSelectionModel} from "@mui/x-data-grid";
import { useModalStore } from "@/store/useModalStore";
import { ExportButtonPro } from "@/components/shared/exportCsvButton";
import { getCaixasColumns } from "./columns";

interface ComponentPdvsProps {
  setRowSelectedProp: (row: TypeCaixas) => void;
  caixasSSR: TypeCaixas[];
}

const ComponentPdvs = ({ setRowSelectedProp, caixasSSR }: ComponentPdvsProps) => {
  // STATES locais se necessário para outros fins
  const [showModalIncluiCaixa, setShowModalIncluiCaixa] = useState(false);
  const { openEnviarConfig } = useModalStore();
  
  // FETCHING DATA
  const {data: dataByIdCaixa} = useFetchByIdCaixa("1");
    


  const caixasColumns = getCaixasColumns(setRowSelectedProp);
  
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
              rows={caixasSSR} 
              columns={caixasColumns}
              disableRowSelectionOnClick
              onRowClick={(rowData: any) => setRowSelectedProp(rowData)}
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
                  <DropdownMenuItem onClick={openEnviarConfig}>
                    <ArrowRightCircle />Enviar Configuração
                  </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExportButtonPro rows={caixasSSR ?? []}>Excel</ExportButtonPro>
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