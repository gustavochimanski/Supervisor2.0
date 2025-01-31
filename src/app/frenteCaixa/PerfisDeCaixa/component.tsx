import { DataTable } from "@/components/shared/data-table"
import React, { useEffect, useRef, useState } from "react";
import { useFetch, useFetchById } from "./useFetch";
import { ConfigPerfilPdv, PerfilPdv} from "./types";
import { columnsPerfisDeCaixa } from "./columns";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { findSourceMap } from "module";


const ComponentPerfilDeCaixa = () =>{
  // ESTADOS
  const [selectedPerfilPdvId, setSelectedPerfilPdvId] = useState<number | null>(null); // Estado para armazenar perfil Clicado
  const [showModal, setShowModal] = useState(false) // Estado para controlar modal

  // REQUISIÇÕES
  const { data: dataAllPerfilPdv } = useFetch<PerfilPdv[]>("/v1/config/perfilpdv") //Requisição Todos os Perfis de Caixa
  const {data: dataByIdPerfilPdv} = useFetchById<PerfilPdv>(
    selectedPerfilPdvId? `/v1/config/perfilpdv/${selectedPerfilPdvId}` : null) // Requisição Perfil De caixa Por ID

  // REFERÊNCIAS
  const formRef = useRef<any>(null); // Referência para o formulário

  const handleRowClick = (row: PerfilPdv) =>{
    setSelectedPerfilPdvId(row.id)
    setShowModal(true)
  }

  // Lidar com botão salvar do Pai do formulário
  const handleSave = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

 

    return(
        <div>
          {/* =========== TABELA ============ */}
          <DataTable 
            columns={columnsPerfisDeCaixa} 
            data={dataAllPerfilPdv ?? []}
            onRowClick={handleRowClick}
            />

          {/* =========== MODAL ========== */}
          {showModal && (
            <Modal onClose={() => setShowModal(false)} style={{ width: "80vw" , height: "70vh"}}>
              {/* ==== CABECALHO ==== */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>
                    Perfil de Caixa <span>{dataByIdPerfilPdv ? dataByIdPerfilPdv.descricao : "Carregando ..."}</span>
                  </CardDescription>
                </CardHeader>
                
                    <CardContent className="h-[50vh] overflow-auto">
                      {dataByIdPerfilPdv && (
                        <div>
                          {dataByIdPerfilPdv.confPerfil.map((config) => (
                            <div key={config.id}>{config.id}</div>
                          ))}
                        </div>
                      )}
                  </CardContent>

                    {/* ===== RODAPÉ ==== */}
                  <CardFooter className="justify-between">
                      <Button onClick={() => setShowModal(false)} variant={"destructive"}>
                        Fechar
                      </Button>
                      <Button onClick={handleSave} variant={"default"}>
                        Salvar
                      </Button>
                  </CardFooter>

                
              </Card>

            </Modal>
          )}


          {/* ============ BUTTONS RODAPÉ ============ */}
          <div className ="fixed flex bottom-0  w-full text-white p-4 gap-4 text-center ">
              <Button>Incluir</Button>
              <Button>Portabilidade</Button>
              <Button>Atualizar</Button>
              <Button variant={"destructive"}>Deletar</Button>
          </div>

        </div>
    )
}

export default ComponentPerfilDeCaixa