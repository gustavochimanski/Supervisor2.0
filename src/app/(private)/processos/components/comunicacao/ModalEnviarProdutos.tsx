import LeftZeroInput from "@/components/shared/Inputs/LeftZeroInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { CircleArrowRight, CircleX } from "lucide-react";
import { useState } from "react";

interface ModalEnviarConfiguracaoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEnviarProdutos = ({ isOpen, onClose }: ModalEnviarConfiguracaoProps) => {
    if (!isOpen) return null;
  
    const [empresa, setEmpresa] = useState<string>("");
    console.log(empresa)

  return (
    <Modal onClose={onClose}>
      <Card>
        <CardHeader>
          <CardTitle>Enviar Configuração</CardTitle>
        </CardHeader>

        <CardContent className="flex px-8 gap-4 pb-4 pt-2">
            <div className="flex flex-col">
              <label className="text-sm text-muted-foreground mb-1">Empresa</label>
              <LeftZeroInput min={1} max={999} className="w-20" placeholder="Empresa" onFormattedChange={(val) => setEmpresa(val)} value={empresa} />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-muted-foreground mb-1">Nome Empresa</label>
              <Input placeholder="Nome Empresa" disabled />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-muted-foreground mb-1">Caixa</label>
              <Input placeholder="Caixas" />
            </div>
        </CardContent>

        <CardContent className="h-[50vh] px-8 overflow-auto">
          {"AQUI VAI O SQL"}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant={"outline"} onClick={onClose}>
            <CircleX/> Cancelar
          </Button>
          <Button >
            <CircleArrowRight/>Enviar
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
};

export default ModalEnviarProdutos;
