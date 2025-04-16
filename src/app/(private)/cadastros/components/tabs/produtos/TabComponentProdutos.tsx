"use client"

import DataTableComponentMui from "@/components/shared/table/mui-data-table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProdutosColumns, nfceColumnOrder } from "./columns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { SearchComponent } from "@/components/shared/searchComponent"
import { useFetchProdutos } from "../../../hooks/useProdutos"
import { CircleCheck } from "lucide-react"
import { ExportButtonPro } from "@/components/shared/exportCsvButton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


  
const TabComponentProdutos = () => {
    const [showModalConfig, setShowModalConfig] = useState(false)
    const { data: dataProdutos } = useFetchProdutos()
    
    return(
        <div className="flex flex-col h-full">
        <Card className="flex flex-col h-full">
            {/* =================================================== */}
            {/* ==================== PESQUISAR  =================== */}
            <CardHeader>
                <CardTitle>Cadastro de Produtos</CardTitle>
                <div>
                   <SearchComponent className="w-full md:w-60" />
                </div>
            </CardHeader>
                <CardContent className="p-0 flex-1 overflow-hidden">
                    
                    <DataTableComponentMui 
                        rows={dataProdutos} 
                        columns={getProdutosColumns(setShowModalConfig)}
                        getRowId={(row) => row["Código"]}
                        columnOrder={nfceColumnOrder}
                    />
                </CardContent>
                
                <CardFooter className="gap-4">
                    <Button><CircleCheck/>Incluir</Button>
                    <Button variant={"secondary"}>Hello</Button>
                    <ExportButtonPro rows={dataProdutos ?? []} columns={nfceColumnOrder}/>
                </CardFooter>
            </Card>


            {showModalConfig && (
                <Modal onClose={() => setShowModalConfig(false)}>
                    <div>hwllo</div>
                </Modal>
            )}
        </div>
    )
}


export default TabComponentProdutos