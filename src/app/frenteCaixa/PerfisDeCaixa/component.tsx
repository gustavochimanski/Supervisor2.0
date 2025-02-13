import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { columnsPerfisDeCaixa } from "./columns";
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
  useFetchAllPerfil,
  useFetchByIdPerfil,
  usePostNewPerfilDeCaixa,
  useDelPerfilDeCaixa,
  usePutConfPerfilPdv,
} from "./usePerfil";
import { ConfigPerfilPdv, PerfilPdv } from "./types";

const ComponentPerfilDeCaixa: React.FC = () => {
  // ===== STATES =====
  const [selectedPerfilPdvId, setSelectedPerfilPdvId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<PerfilPdv | undefined>(undefined);
  // Aqui vamos armazenar os dados originais para comparação
  const [originalData, setOriginalData] = useState<PerfilPdv | undefined>(undefined);

  const [showModalIncluirPerfil, setShowModalIncluirPerfil] = useState(false);
  const [showModalPerfilById, setShowModalPerfilById] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [newPerfilDescricao, setNewPerfilDescricao] = useState<string>("");

  // ===== DATA FETCHING =====
  const { data: dataAllPerfilPdv, refetch: refetchAllPerfil } = useFetchAllPerfil();
  const { data: dataByIdPerfilPdv } = useFetchByIdPerfil(selectedPerfilPdvId);

  // Hook para PUT (atualizar configuração)
  const { mutate: updateConfigPerfil } = usePutConfPerfilPdv();

  // Initialize formData and originalData when a perfil is fetched by its ID
  useEffect(() => {
    if (dataByIdPerfilPdv) {
      const initialData: PerfilPdv = {
        id: dataByIdPerfilPdv.id,
        descricao: dataByIdPerfilPdv.descricao,
        confPerfil: dataByIdPerfilPdv.confPerfil.map((item: ConfigPerfilPdv) => ({
          id: item.id,
          property: item.property,
          value: item.value,
          perfilId: item.perfilId,
        })),
      };
      setFormData(initialData);
      // Armazena os dados originais para comparação
      setOriginalData(initialData);
    }
  }, [dataByIdPerfilPdv]);

  // ===== HANDLERS =====
  const handleRowClick = (row: PerfilPdv) => {
    setSelectedPerfilPdvId(String(row.id));
    setShowModalPerfilById(true);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setFormData((prev) => {
      if (!prev) return prev;

      // Atualiza o campo 'descricao' se for esse o caso
      if (name.toLowerCase() === "descricao") {
        return { ...prev, descricao: value };
      }

      // Atualiza um item de configuração em confPerfil
      const confIndex = prev.confPerfil.findIndex(
        (item) => item.property.toLowerCase() === name.toLowerCase()
      );
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
  const { mutate: postNewPerfil } = usePostNewPerfilDeCaixa();
  const handleSaveNewPerfil = () => {
    postNewPerfil(newPerfilDescricao);
    setShowModalIncluirPerfil(false);
    setNewPerfilDescricao("");
  };

  // ================================================================= 
  // ===================== APAGA PERFIL POR ID =======================
  const { mutate: deletePerfil } = useDelPerfilDeCaixa();
  const handleDeletePerfil = (id?: number) => {
    if (!id) {
      console.error("ID inválido para deleção");
      return;
    }
    deletePerfil(String(id));
    setShowModalPerfilById(false);
  };

  // =================================================================
  // ================== PUT ALTERAR CONFIG PERFIL ====================
  const handleSave = () => {
    if (!formData || !originalData) {
      console.error("Dados insuficientes para comparação");
      return;
    }

    // Verifica cada configuração se houve alteração
    formData.confPerfil.forEach((config) => {
      const originalConfig = originalData.confPerfil.find(
        (item) => item.property.toLowerCase() === config.property.toLowerCase()
      );
      if (originalConfig && originalConfig.value !== config.value) {
        // Cria o payload para o PUT
        const payload = {
          id: config.id,
          property: config.property,
          value: config.value,
          perfilId: config.perfilId,
        };
        
        updateConfigPerfil({
          idPerfil: String(config.perfilId),
          payload: payload,
        });
      }
    });

    // Se você também precisa atualizar o campo "descricao", pode comparar e atualizar aqui:
    if (formData.descricao !== originalData.descricao) {
      console.log("A descrição foi alterada para:", formData.descricao);
      // Dispare a atualização para a descrição se necessário
    }
  };

  const handleClickInserirPerfil = () => {
    setShowModalIncluirPerfil(true);
  };

  return (
    <div>
      {/* ===== Data Table ===== */}
      <DataTable
        columns={columnsPerfisDeCaixa}
        data={dataAllPerfilPdv ?? []}
        onRowClick={handleRowClick}
      />

      {/* ===== Perfil Detail Modal ===== */}
      {showModalPerfilById && (
        <Modal onClose={() => setShowModalPerfilById(false)} style={{ width: "80vw", height: "70vh" }}>
          <Card className="h-full">
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
                    id={formData?.confPerfil.find(item => item.property === 'Impressora')?.id.toString() || ''}
                    name="Impressora"
                    value={formData?.confPerfil.find(item => item.property === 'Impressora')?.value || ''}
                    onChange={handleChange}
                    className="w-28"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex gap-4 justify-center">
              <Button onClick={() => setShowModalPerfilById(false)} variant="outline">
                Fechar
              </Button>
              <Button variant="destructive" onClick={() => setShowModalConfirm(true)}>
                Apagar
              </Button>
              <Button onClick={handleSave} variant="default">
                Salvar
              </Button>
            </CardFooter>
          </Card>

          {/* ===== Confirmation Modal for Deletion ===== */}
          {showModalConfirm && (
            <Modal onClose={() => setShowModalConfirm(false)} style={{ width: "350px", textAlign: "center" }}>
              <Card>
                <CardHeader>
                  <CardTitle>Tem certeza que deseja apagar o perfil?</CardTitle>
                  <CardDescription>Atenção! Todas as informações serão perdidas!</CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-4 justify-center">
                  <Button onClick={() => handleDeletePerfil(dataByIdPerfilPdv?.id)} variant="destructive">
                    Confirmar
                  </Button>
                  <Button onClick={() => setShowModalConfirm(false)} variant="outline">
                    Cancelar
                  </Button>
                </CardFooter>
              </Card>
            </Modal>
          )}
        </Modal>
      )}

      {/* ===== Footer Buttons ===== */}
      <div className="fixed flex bottom-0 w-full text-white p-4 gap-4 text-center">
        <Button onClick={handleClickInserirPerfil}>Incluir</Button>
        <Button>Portabilidade</Button>
        <Button onClick={() => refetchAllPerfil()}>Atualizar</Button>
        <Button variant="destructive">Deletar</Button>
      </div>

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
