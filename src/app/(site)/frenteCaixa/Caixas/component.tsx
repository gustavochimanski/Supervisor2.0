import { DataTable } from "@/components/shared/data-table";
import { useFetchAllCaixas, useFetchByIdCaixa } from "./useCaixa";
import { caixasColumns } from "./columns";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { PerfilPdv } from "../PerfisDeCaixa/types";
import { TypeCaixas } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";


const ComponentCaixas = () => {
    // STATES
    const [selectedIdCaixa, setSelectedIdCaixa] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState<TypeCaixas| undefined>(undefined);
    const [originalData, setOriginalData] = useState<TypeCaixas| undefined>(undefined);

    // MODALS
    const [showModalByIdCaixa, setShowModalByIdCaixa] = useState(false);

    // FETCHING DATA
    const {data: dataAllCaixas} = useFetchAllCaixas();
    const {data: dataByIdCaixa} = useFetchByIdCaixa(selectedIdCaixa);


      const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
    
        setFormData((prev) => {
          if (!prev) return prev;
    
          // Atualiza o campo 'descricao'
          if (name === "descricao") {
            return { ...prev, descricao: value };
          }
    
          return prev;
        });
      };

    const handleRowClick = (row: TypeCaixas) => {
    setSelectedIdCaixa(String(row.id));
    setShowModalByIdCaixa(true);
  };

    return(
        <div>
            <DataTable 
              columns={caixasColumns} 
              data={dataAllCaixas ?? []} 
              onRowClick={handleRowClick}
            />

            {showModalByIdCaixa && 
             <Modal onClose={() => setShowModalByIdCaixa(false)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Configurações</CardTitle>
                        <CardDescription>Caixa {dataByIdCaixa? dataByIdCaixa.descricao : "Carregando..."}</CardDescription>
                    </CardHeader>

                    <CardContent>
                    <form className="flex flex-wrap my-4 gap-4">
                    <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={dataByIdCaixa?.descricao || ""}
                    onChange={handleChange}
                    className="w-60"
                  />
                </div>
                    <div>
                  <Label htmlFor="empresaId">Empresa</Label>
                  <Input
                    type="text"
                    id="empresaId"
                    name="empresaId"
                    value={dataByIdCaixa?.empresaId || ""}
                    onChange={handleChange}
                    className="w-60"
                  />
                </div>
                <Separator/>
                   <CardTitle>Perfil Pdv</CardTitle>
                   <div className="flex gap-4 items-center">
                   <Label htmlFor="descPerfil">Descrição Perfil</Label>
                  <Input
                    type="text"
                    id="descPerfil"
                    name="descricao"
                    value={dataByIdCaixa?.perfilPdv.descricao || ""}
                    onChange={handleChange}
                    className="w-60"
                  />
                   </div>
                    </form>
                    </CardContent>
                </Card>
             </Modal>}
        </div>
    )
}




export default ComponentCaixas;