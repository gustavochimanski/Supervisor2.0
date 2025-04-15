"use client"

import { useFetchAllCaixas, useFetchByIdCaixa } from "../../../../hooks/useCaixa";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TypeCaixas } from "../../../../types/typesCaixas";
import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import { SearchComponent } from "@/components/shared/searchComponent";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, CircleCheck, CirclePlus, CircleX, EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/store/useModalStore";
import { ExportButtonPro } from "@/components/shared/exportCsvButton";
import { getCaixasColumns } from "../config/columns";
import ModalIncluirPdv from "./ModalIncluirPdv";

interface ComponentPdvsProps {
  setRowSelectedProp: (row: TypeCaixas) => void;
  caixasSSR: TypeCaixas[];
  setModoEdicao: (ativo: boolean) => void; // ⬅ novo prop
}

const ComponentPdvs = ({ setRowSelectedProp, caixasSSR, setModoEdicao }: ComponentPdvsProps) => {
  // STATES locais se necessário para outros fins
  const [showModalIncluiPdv, setShowModalIncluiPdv] = useState(false);
  const { openEnviarConfig } = useModalStore();
  
  // FETCHING DATA
  const {data: dataByIdCaixa} = useFetchByIdCaixa("1");
    

  const columns = getCaixasColumns(() => setModoEdicao(true));

  
    return(
        <div className="flex-1 h-full flex flex-col">
            <CardHeader>
              <SearchComponent className="w-52"></SearchComponent>
            </CardHeader>

            {/* =================================================== */}
            {/* ====================== TABELA ===================== */}
            <CardContent className="flex-1 h-full">
              <DataTableComponentMui 
                rows={caixasSSR} 
                columns={columns}
                onRowClick={(rowData: any) => setRowSelectedProp(rowData)}
              />
            </CardContent>

            {/* =================================================== */}
            {/* =============== BUTTONS FUNCOES =================== */}
            <CardFooter className="justify-between">
              <Button onClick={() => setShowModalIncluiPdv(true)}>
                <CirclePlus/>Incluir
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"secondary"} >
                    <EllipsisVertical/>Mais
                  </Button>
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
            </CardFooter>


            {/* ============================================ */}
            {/* ================== MODALS ================== */}
            <ModalIncluirPdv open={showModalIncluiPdv} onClose={() => setShowModalIncluiPdv(false)} />     
    </div>
    )
}




export default ComponentPdvs;