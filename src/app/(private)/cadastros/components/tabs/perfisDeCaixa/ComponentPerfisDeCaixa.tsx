  "use client"

  import React, { useEffect, useState } from "react";
  import { Modal } from "@/components/ui/modal";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Separator } from "@/components/ui/separator";
  import { Label } from "@/components/ui/label";
  import {
    useFetchByIdPerfil,
    useDelPerfil,
    usePostNewPerfil,
    usePutConfPerfilPdv,
    usePutAlteraDescricao,
  } from "../../../hooks/usePerfisDeCaixa";
  import { PatchConfPerfilPayload, PerfilPdv } from "../../../types/typesPerfisDeCaixa";
  import DataTableComponentMui from "@/components/shared/table/mui-data-table";
  import { SearchComponent } from "@/components/shared/searchComponent";
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
  import { ArrowRightCircle, CirclePlus, EllipsisVertical } from "lucide-react";
  import ConfirmModal from "@/components/shared/modals/modalConfirm";
  import { ExportButtonPro } from "@/components/shared/exportCsvButton";
  import { useModalStore } from "@/store/useModalStore";
  import {columns} from "./columns"
  
  type Props = {
    perfisSSR: PerfilPdv[];
  };  

  const ComponentPerfilDeCaixa = ({ perfisSSR }: Props) => {
    // ===== STATES =====
    const [selectedPerfilPdvId, setSelectedPerfilPdvId] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState<PerfilPdv | undefined>(undefined);
    const [originalData, setOriginalData] = useState<PerfilPdv | undefined>(undefined);
    const { openEnviarConfig } = useModalStore()
    
    // ==== MODAIS ======
    const [showModalIncluirPerfil, setShowModalIncluirPerfil] = useState(false);
    const [showModalPerfilById, setShowModalPerfilById] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    
    // ===== DATA FETCHING =====
    const { data: dataByIdPerfilPdv } = useFetchByIdPerfil(selectedPerfilPdvId);
    const [allPerfis, setAllPerfis] = useState(perfisSSR);

    // Hooks para PUT
    const { mutate: updateConfigPerfil } = usePutConfPerfilPdv();
    const { mutate: updateDescricaoPerfil } = usePutAlteraDescricao();

    // Initialize formData and originalData when a perfil is fetched by its ID
    useEffect(() => {
      if (dataByIdPerfilPdv) {
        const initialData: PerfilPdv = {
          id: dataByIdPerfilPdv.id,
          descricao: dataByIdPerfilPdv.descricao,
          confPerfil: dataByIdPerfilPdv.confPerfil.map((item: PatchConfPerfilPayload) => ({
            id: item.id,
            property: item.property,
            value: item.value,
            perfilId: item.perfilId,
          })),
        };
        setFormData(initialData);
        setOriginalData(initialData);
      }
    }, [dataByIdPerfilPdv]);

    // ===== HANDLERS =====
    const handleVerConfig = (row: PerfilPdv) => {
      setSelectedPerfilPdvId(String(row.id));
      setShowModalPerfilById(true);
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target;

      setFormData((prev) => {
        if (!prev) return prev;

        // Atualiza o campo 'descricao'
        if (name === "descricao") {
          return { ...prev, descricao: value };
        }

        // Atualiza um item de configuração em confPerfil
        const confIndex = prev.confPerfil.findIndex((item) => item.property === name);
        if (confIndex !== -1) {
          const updatedConf = [...prev.confPerfil];
          updatedConf[confIndex] = { ...updatedConf[confIndex], value };
          return { ...prev, confPerfil: updatedConf };
        }

        return prev;
      });
    };

    // =================================================================
    // ================== POST NOVO PERFIL DE CAIXA ====================
    const { mutate: postNewPerfil } = usePostNewPerfil();
    const [newPerfilDescricao, setNewPerfilDescricao] = useState<string>("");
    const handleSaveNewPerfil = () => {
      postNewPerfil(newPerfilDescricao);
      setShowModalIncluirPerfil(false);
      setNewPerfilDescricao("");
    };

    // ================================================================= 
    // ===================== APAGA PERFIL POR ID =======================
    const { mutate: deletePerfil } = useDelPerfil();
    const handleDeletePerfil = (id?: string) => {
      if (!id) {
        console.error("ID inválido para deleção");
        return;
      }
      deletePerfil(id);
      setShowModalPerfilById(false);
    };

    // =================================================================
    // ================== PUT ALTERAR CONFIG PERFIL ====================
    const handleSave = () => {
      if (!formData || !originalData) {
        console.error("Dados insuficientes para comparação");
        return;
      }
    
      if (!dataByIdPerfilPdv?.id) {
        console.error("ID do perfil PDV não está disponível");
        return;
      }
    
      // Filtra apenas os itens de confPerfil que tiveram alteração no valor
      const modifiedConfigs = formData.confPerfil.filter((config) => {
        const originalConfig = originalData.confPerfil.find(
          (item) => item.property === config.property
        );
        return originalConfig && originalConfig.value !== config.value;
      });
    
      // Se houver itens modificados, envia cada um via PUT
      if (modifiedConfigs.length > 0) {
        updateConfigPerfil({
          idPerfil: String(dataByIdPerfilPdv.id),
          payloadArray: modifiedConfigs,
        });
      }
    
      // Atualiza a descrição se houve alteração
      if (formData.descricao !== originalData.descricao) {
        updateDescricaoPerfil({
          idPerfil: String(formData.id),
          descricao: formData.descricao,
        });
      }
    };
    
    return (
      <div className="flex flex-col h-full">
        {/* =============== CONTAINER TOPO ============== */}
        <div className="flex flex-col md:flex-row w-full justify-between mb-4 gap-4 text-center">
          {/* =================================================== */}
          {/* ==================== PESQUISAR  =================== */}
          {/* =================================================== */}
            <SearchComponent className="w-full md:w-60" />
        </div>

        {/* =================================================== */}
        {/* ====================== TABELA ===================== */}
        {/* =================================================== */}
        <DataTableComponentMui 
          rows={allPerfis} 
          columns={columns}
          onRowClick={(rowData: any) =>
            handleVerConfig(rowData)
          }
        />
          {/* =================================================== */}
          {/* =============== BUTTONS FUNCOES =================== */}
          {/* =================================================== */}
          <div className="flex justify-between gap-2"> 
            <Button onClick={() => setShowModalIncluirPerfil(true)}><CirclePlus/>Incluir</Button>
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
                  <ExportButtonPro rows={allPerfis}>Excel</ExportButtonPro>
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        {/* ===== Detalhes do perfil ===== */}
        {showModalPerfilById && (
          <Modal onClose={() => setShowModalPerfilById(false)} style={{ width: "80vw", height: "70vh" }}>
            
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Perfil de Caixa{" "}
                <span>
                  {dataByIdPerfilPdv ? dataByIdPerfilPdv.descricao : "Carregando..."}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[50vh] overflow-auto">
              <Separator />
              <form className="flex flex-wrap my-4 gap-4">
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={formData?.descricao || ""}
                    onChange={handleChange}
                    className="w-60"
                  />
                </div>
                <Separator />
                <div>
                  <Label htmlFor="impressora">Impressora</Label>
                  <Input
                    type="text"
                    id={formData?.confPerfil.find((item) => item.property === "Impressora")?.id.toString() || ""}
                    name="Impressora"
                    value={formData?.confPerfil.find((item) => item.property === "Impressora")?.value || ""}
                    onChange={handleChange}
                    className="w-28"
                  />
                </div>
                <div>
                  <Label htmlFor="impressoraParity">Impressora</Label>
                  <Input
                    type="text"
                    id={ formData?.confPerfil.find((item) => item.property === "ImpressoraParity")?.id.toString() || ""}
                    name="ImpressoraParity"
                    value={formData?.confPerfil.find((item) => item.property === "ImpressoraParity")?.value || ""}
                    onChange={handleChange}
                    className="w-28"
                  />
                </div>
              </form>
            </CardContent>

            {/* ========== FOOTER ========= */}
            <CardFooter className="flex gap-4 justify-center">
              <Button variant="destructive" onClick={() => setShowModalConfirm(true)}>
                Apagar
              </Button>
              <Button onClick={() => setShowModalPerfilById(false)} variant="outline">
                Fechar
              </Button>
              <Button onClick={handleSave} type="submit" variant={"gradient"}>
                Salvar
              </Button>
            </CardFooter>

            {/* ============= MODAL CONFIRMAR =========== */}
            <ConfirmModal
              isOpen={showModalConfirm}
              title="Tem certeza que deseja apagar o Perfil de Caixa ? "
              description="Essa ação não poderá ser desfeita."
              confirmLabel="Apagar"
              cancelLabel="Cancelar"
              onClose={() => setShowModalConfirm(false)}
              onConfirm={() => { handleDeletePerfil(dataByIdPerfilPdv?.id); setShowModalConfirm(false); }}
              
            />
          </Modal>
        )}

        {/* ===== New Perfil Modal ===== */}
        {showModalIncluirPerfil && (
          <Modal onClose={() => setShowModalIncluirPerfil(false)} style={{ width: "350px" }}>
            <Card>
              <CardHeader>
                <CardTitle>Incluir Novo Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="newPerfilDescricao">Descrição</Label>
                <Input
                  id="newPerfilDescricao"
                  type="text"
                  onChange={(e) => setNewPerfilDescricao(e.target.value)}
                  value={newPerfilDescricao}
                />
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="destructive" onClick={() => setShowModalIncluirPerfil(false)}>
                  Fechar
                </Button>
                <Button onClick={handleSaveNewPerfil}>Salvar</Button>
              </CardFooter>
            </Card>
          </Modal>
        )}
      </div>
    );
  };

  export default ComponentPerfilDeCaixa;
