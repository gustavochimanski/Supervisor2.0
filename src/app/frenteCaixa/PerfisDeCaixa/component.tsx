import { DataTable } from "@/components/shared/data-table"
import React, { useEffect, useRef, useState } from "react";
import { useFetch, useFetchById } from "./useFetch";
import { ConfigPerfilPdv, PerfilPdv} from "./types";
import { columnsPerfisDeCaixa } from "./columns";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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


  const handleSave = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

 

    return(
        <div>
          <DataTable 
            columns={columnsPerfisDeCaixa} 
            data={dataAllPerfilPdv ?? []}
            onRowClick={handleRowClick}
            />

          {/* =========== MODAL ========== */}
          {showModal && (
            <Modal onClose={() => setShowModal(false)} style={{ width: "80vh" }}>
              <Card>

              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>Perfil de Caixa <span>{dataByIdPerfilPdv ? dataByIdPerfilPdv.descricao : "Carregando ..."}</span></CardDescription>
              </CardHeader>
              <div className="sticky top-0 z-10 bg-[var(--foreground)] rounded-[var(--radius)] shadow-md  p-4">
                <CardContent>
                  {dataByIdPerfilPdv && (
                    <div>
                      {dataByIdPerfilPdv.confPerfil.map((config) =>(
                        <div></div>
                      ))}
                    </div>
                  )}

                </CardContent>
    
                <div className="sticky bottom-0 z-10 bg-white shadow-md flex justify-between p-4">
                  <Button onClick={() => setShowModal(false)} variant={"destructive"}>
                    Fechar
                  </Button>
                  <Button onClick={handleSave} variant={"default"}>
                    Salvar
                  </Button>
                </div>
              </div>
              </Card>
            </Modal>
          )}


          <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center">
              Hello
          </div>

        </div>
    )
}

export default ComponentPerfilDeCaixa