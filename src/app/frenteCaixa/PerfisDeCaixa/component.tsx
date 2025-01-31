
import { DataTable } from "@/components/shared/data-table"

import React, {useEffect, useRef, useState } from "react";
import { FormDataperfil, PerfilPdv} from "./types";
import { columnsPerfisDeCaixa } from "./columns";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchAll, useFetchById} from "./useFetch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";


const ComponentPerfilDeCaixa = () =>{
  // === ESTADOS ===
  const [selectedPerfilPdvId, setSelectedPerfilPdvId] = useState<string | undefined>(undefined); // Estado para armazenar perfil Clicado
  const [showModal, setShowModal] = useState(false) // Estado para controlar modal
  const [formData, setFormData] = useState<FormDataperfil>({
    Impressora: "",
    ImpressoraPorta: "",
    ImpressoraBaudRate: "",
    ImpressoraParity: "",
    ImpressoraStopBits: "",
    ImpressoraDataBits: "",
    Scanner: "",
    ScannerPorta: "",
    ScannerBaudRate: "",
    ScannerParity: "",
    ScannerStopBits: "",
    ScannerDataBits: "",
    Balanca: "",
    BalancaPorta: "",
    BalancaBaudRate: "",
    BalancaParity: "",
    BalancaStopBits: "",
    BalancaDataBits: "",
    BalancaTimeOut: "",
    Teclado: "",
    CodigoPrecoVenda: ""
  });

  // // === REQUISIÇÕES ===
  const { data: dataAllPerfilPdv, isFetching: isFetchingAll } = useFetchAll(); // Fetch todos os perfis PDV
  const { data: dataByIdPerfilPdv, isFetching: isFetchingById } = useFetchById(selectedPerfilPdvId); // Fetch perfil PDV por ID

  // REFERÊNCIAS
  const formRef = useRef<any>(null); // Referência para o formulário

  // === EFEITOS ===
  // Inicializa o formData quando dataByIdPerfilPdv é carregado
  useEffect(() =>{
    if (dataAllPerfilPdv && dataByIdPerfilPdv){
      let initialData: FormDataperfil = {
        Impressora: "",
        ImpressoraPorta: "",
        ImpressoraBaudRate: "",
        ImpressoraParity: "",
        ImpressoraStopBits: "",
        ImpressoraDataBits: "",
        Scanner: "",
        ScannerPorta: "",
        ScannerBaudRate: "",
        ScannerParity: "",
        ScannerStopBits: "",
        ScannerDataBits: "",
        Balanca: "",
        BalancaPorta: "",
        BalancaBaudRate: "",
        BalancaParity: "",
        BalancaStopBits: "",
        BalancaDataBits: "",
        BalancaTimeOut: "",
        Teclado: "",
        CodigoPrecoVenda: ""
      };
      dataByIdPerfilPdv.confPerfil.forEach((item) =>{
        initialData[item.property as keyof FormDataperfil] = item.value
      });
      setFormData(initialData);
    };
  }, [dataByIdPerfilPdv]);

  // ==== FUNCOES ===
  // Lida com o Click de linha da tabela
  const handleRowClick = (row: PerfilPdv) =>{
    setSelectedPerfilPdvId(String(row.id))
    setShowModal(true)
  }

  // Lidar com alterações nos input
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = evt.target
    setFormData((prev) =>({...prev, [name]: value,}))
  }
  

  // Lidar com botão salvar do Pai do formulário
  const handleSave = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
    console.log(formData)
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

                  {/* =========== CONTEUDO ===========*/}
                  <CardContent className="h-[50vh] overflow-auto">
                    <Separator/>
                      <form action="" className="flex flex-wrap my-4 gap-4">
                      {/* Impressora */}
                      <div>
                        <label htmlFor="Impressora">Impressora</label>
                        <Input
                          type="text"
                          id="Impressora"
                          name="Impressora"
                          value={formData.Impressora|| ''}
                          onChange={handleChange}
                          className="w-28"
                        />
                      </div>
                      {/* ImpressoraPorta */}
                      <div >
                        <label htmlFor="ImpressoraPorta">Porta</label>
                        <Input
                          type="text"
                          id="ImpressoraPorta"
                          name="ImpressoraPorta"
                          value={formData.ImpressoraPorta || ''}
                          onChange={handleChange}
                          className="w-28"
                        />
                      </div>

                      {/* ImpressoraPorta */}
                      <div>
                        <label htmlFor="ImpressoraPorta">Velocidade</label>
                        <Input
                          type="text"
                          id="ImpressoraBaudRate"
                          name="ImpressoraBaudRate"
                          value={formData.ImpressoraBaudRate || ''}
                          onChange={handleChange}
                          className="w-28"
                        />
                      </div>

                      </form>
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
