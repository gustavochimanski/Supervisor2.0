"use client"

import DataTableComponentMui from "@/components/shared/table/mui-data-table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProdutosColumns, nfceColumnOrder } from "./columns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { SearchComponent } from "@/components/shared/searchComponent"

type ComponentProdutosProps = {
    produtosSSR: any[];
  };
  
const ComponentProdutos = ({ produtosSSR }: ComponentProdutosProps) => {
    const [showModalConfig, setShowModalConfig] = useState(false)

    console.log(showModalConfig)

    return(
        <div className="flex flex-col h-full">
        <Card className="flex flex-col h-full">
            {/* =============== CONTAINER TOPO ============== */}
            {/* =================================================== */}
            {/* ==================== PESQUISAR  =================== */}
            {/* =================================================== */}
            <CardHeader>
                <CardTitle>Cadastro de Produtos</CardTitle>
                <div>
                <SearchComponent className="w-full md:w-60" />
                </div>
            </CardHeader>
                <CardContent className="p-0 flex-1 overflow-hidden">
                    <DataTableComponentMui 
                        rows={produtosSSR} 
                        columns={getProdutosColumns(setShowModalConfig)}
                        getRowId={(row) => row["Código"]}
                        columnOrder={nfceColumnOrder}
                    />
                </CardContent>
                
                <div className="flex justify-between pb-2 px-2">
                    <Button>Incluir</Button>
                    <Button>Hello</Button>
                </div>
            </Card>





            {showModalConfig && (
                <Modal onClose={() => setShowModalConfig(false)}>
                    <div>hwllo</div>
                </Modal>
            )}
        </div>
    )
}


export default ComponentProdutos