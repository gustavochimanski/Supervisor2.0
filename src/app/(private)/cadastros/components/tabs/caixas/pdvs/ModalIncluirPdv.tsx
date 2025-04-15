"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal"; // ajuste o caminho conforme onde você colocou o Modal base
import { CircleCheck, CircleX } from "lucide-react";
import { Label } from "@/components/ui/label";

type ModalIncluirPdvProps = {
  open: boolean;
  onClose: () => void;
};

const ModalIncluirPdv = ({ open, onClose }: ModalIncluirPdvProps) => {
  if (!open) return null;

  return (
    <Modal onClose={onClose} style={{ width: "300px" }}>
      <Card className="h-72">
        <CardHeader>
          <CardTitle>Incluir Novo PDV</CardTitle>
        </CardHeader>

        <CardContent className="p-6 gap-2 flex flex-col flex-1">
            <div>
                <Label>Descrição</Label>
                <Input placeholder="..." />
            </div>
            <div>
                <Label>Empresa</Label>
                <Input placeholder="..." />
            </div>
        </CardContent>

        <CardFooter className="justify-between">
          <Button variant="destructive" onClick={onClose}>
            <CircleX className="mr-2" size={16} /> Cancelar
          </Button>
          <Button>
            <CircleCheck className="mr-2" size={16} /> Confirmar
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
};

export default ModalIncluirPdv;
