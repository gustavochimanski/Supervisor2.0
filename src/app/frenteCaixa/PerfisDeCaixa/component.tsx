
import { DataTable } from "@/components/shared/data-table"

import React, {useEffect, useRef, useState } from "react";
import { FormDataperfil, PerfilPdv} from "./types";
import { columnsPerfisDeCaixa } from "./columns";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchAllPerfil, useFetchByIdPerfil, usePostNewPerfilDeCaixa,useDelPerfilDeCaixa} from "./usePerfil";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";


const ComponentPerfilDeCaixa = () =>{
  // === ESTADOS ===
  const [selectedPerfilPdvId, setSelectedPerfilPdvId] = useState<string | undefined>(undefined); // Estado para armazenar perfil Clicado
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

  // ==== MODALS ====
  const [showModalIncluirPerfil, setShowModalIncluirPerfil] = useState(false)
  const [showModalPerfilById, setShowModalPerfilById] = useState(false)
  
  // // === REQUISIÇÕES ===
  const { data: dataAllPerfilPdv, isFetching: isFetchingAll, refetch: refetchAllPerfil } = useFetchAllPerfil(); // Fetch todos os perfis PDV
  const { data: dataByIdPerfilPdv, isFetching: isFetchingById } = useFetchByIdPerfil(selectedPerfilPdvId); // Fetch perfil PDV por ID

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
    setShowModalPerfilById(true)
  }

  // Lidar com alterações nos input d
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = evt.target
    setFormData((prev) =>({...prev, [name]: value,}))
  }

  // =================================================================
  // ================== POST NOVO PERFIL DE CAIXA ====================
  // ESTADOS
  const [newPerfilDescricao, setNewPerfilDescricao] = useState<string>("");
  const [showModalConfirm, setShowModalConfirm ] = useState(false);

  const { mutate: postNewPerfil } = usePostNewPerfilDeCaixa();

  const handleSaveNewPerfil = () => {
    postNewPerfil(newPerfilDescricao)
    setShowModalIncluirPerfil(false);
  };

  // ================================================================= 
  // ===================== APAGA PERFIL POR ID =======================
  const {mutate: deletePerfil} = useDelPerfilDeCaixa();

  const handleDeletePerfil = (id: number | undefined) => {
    if (!id) {
      console.error("ID inválido para deleção");
      return;
    }
    deletePerfil(String(id));
    console.log(id)
  }
  
  // =================================================================

  // Lidar com botão salvar do Pai do formulário
  const handleSave = () => {
    console.log(formData.ImpressoraBaudRate)
  };

  // ====== BUTTONS =======
  const handleClickInserirPerfil = () => {
    setShowModalIncluirPerfil(true);
  }

    return(
        <div>
          {/* =========== TABELA ============ */}
          <DataTable 
            columns={columnsPerfisDeCaixa} 
            data={dataAllPerfilPdv ?? []}
            onRowClick={handleRowClick}
          />

          {/* =========== MODAL ========== */}
          {showModalPerfilById && (
            <Modal onClose={() => setShowModalPerfilById(false)} style={{ width: "80vw" , height: "70vh"}}>
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
                  <CardFooter className="flex gap-4 justify-center">
                      <Button onClick={() => setShowModalPerfilById(false)} variant={"outline"}>Fechar</Button>
                      <Button variant={"destructive"} onClick={() => setShowModalConfirm(true)}>Apagar</Button>
                      <Button onClick={handleSave} variant={"default"}>Salvar</Button>
                  </CardFooter>
              </Card>

              {/* MODAL DE CONFIRMAÇÃO PARA APAGAR PERFIL PDV */}
              {showModalConfirm && (
                <Modal style={{width: "350px", textAlign: "center"}}  onClose={() => setShowModalConfirm(false)}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Tem certeza que deseja apagar o perfil ?</CardTitle>
                      <CardDescription>Atenção! Todas as informações serão perdidas!!! </CardDescription>
                    </CardHeader>

                    <CardFooter className="justify-center flex gap-4">
                      <Button onClick={() => handleDeletePerfil(dataByIdPerfilPdv?.id)} variant={"destructive"}>Confirmar</Button>
                      <Button onClick={() => setShowModalConfirm(false)} variant={"outline"}>Cancelar</Button>
                    </CardFooter>
                    </Card>
                </Modal>
              )}
            </Modal>
            
          )}

          {/* ============ BUTTONS RODAPÉ ============ */}
          <div className ="fixed flex bottom-0  w-full text-white p-4 gap-4 text-center ">
              <Button onClick={handleClickInserirPerfil}>Incluir</Button>
              <Button>Portabilidade</Button>
              <Button onClick={() => refetchAllPerfil()}>Atualizar</Button>
              <Button variant={"destructive"}>Deletar</Button>
          </div>

          {/* ========= MODAL INCLUIR ========== */}
          {showModalIncluirPerfil && (
            <Modal onClose={() => setShowModalIncluirPerfil(false)} style={{width: "350px"}}>
              <Card>
                <CardHeader>
                  <CardTitle>Incluir Novo Perfil</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <Label>Descrição</Label>
                  <Input 
                    onChange={(evt) => setNewPerfilDescricao(evt.target.value)}
                    value={newPerfilDescricao}
                  > 
                  </Input>
                </CardContent>

                <CardFooter className="justify-between">
                  <Button variant={"destructive"} onClick={() => setShowModalIncluirPerfil(false)}>Fechar</Button>
                  <Button onClick={handleSaveNewPerfil}>Salvar</Button>
                </CardFooter>
              </Card>
            </Modal>
          )}
        </div>
    )
}

export default ComponentPerfilDeCaixa
