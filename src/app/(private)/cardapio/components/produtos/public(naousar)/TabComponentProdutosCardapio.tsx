"use client"

import DataTableComponentMui from "@/components/shared/table/mui-data-table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CadProdCols, CadProdColumnOrder } from "./collumns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { SearchComponent } from "@/components/shared/searchComponent"
import { CircleCheck } from "lucide-react"
import { ExportButtonPro } from "@/components/shared/exportCsvButton"
import { useFetchCadProd } from "./useProdutos"
import { TypeCadProd } from "./cadProdTypes"

const TabComponentProdutos = () => {
  const [showModalConfig, setShowModalConfig] = useState(false)
  const [pageProduto, setPageProduto] = useState<number>(1)
  const { data: dataProdutos } = useFetchCadProd(pageProduto)

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full">
        {/* ==================== PESQUISAR =================== */}
        <CardHeader>
          <CardTitle>Cadastro de Produtos</CardTitle>
          <div>
            <SearchComponent className="w-full md:w-60" />
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-auto">
            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 overflow-auto">
                {dataProdutos?.data.map((prod: TypeCadProd) => (
                    <Card key={prod.cadp_codigo} className="shadow-sm border border-muted p-0 overflow-hidden">
                      <div className="p-4 flex flex-col justify-between flex-grow">
                          <div className="mb-2">
                              <h2 className="text-base font-semibold leading-tight">{prod.cadp_descricao}</h2>
                              <p className="text-xs text-muted-foreground">{prod.cadp_categoria} • {prod.cadp_marca}</p>
                          </div>

                          <div className="text-xs space-y-1 text-muted-foreground">
                              <p><strong>Barras:</strong> {prod.cadp_codigobarra}</p>
                              <p><strong>Situação:</strong> {prod.cadp_situacao}</p>
                          </div>

                          <Button
                              size="sm"
                              variant="secondary"
                              className="w-full mt-3"
                              onClick={() => {
                                  setShowModalConfig(true)// opcional: setProdutoSelecionado(prod)
                          }}
                          >
                              Editar
                          </Button>
                      </div>
                    </Card>
                ))}
            </div>
        </CardContent>

        <CardFooter className="gap-4">
          <Button>
            <CircleCheck />Incluir
          </Button>
          <Button variant={"secondary"}>Hello</Button>
          <ExportButtonPro
            rows={dataProdutos?.data ?? []}
            columns={CadProdColumnOrder}
          />
        </CardFooter>
      </Card>

      {showModalConfig && (
        <Modal onClose={() => setShowModalConfig(false)}>
          <div>Configuração do Produto</div>
        </Modal>
      )}
    </div>
  )
}

export default TabComponentProdutos
