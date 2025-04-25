import { usePostNewUser } from "@/app/(private)/cadastros/hooks/useUsuarios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { CircleCheck, CircleX } from "lucide-react";

interface Props {
  onClose: () => void
}

const ModalInserirNovoUsuario = ({onClose}: Props) => {

const {mutateAsync: InserirNovoUsuario} = usePostNewUser();


  return(
    <Modal onClose={onClose} style={{ width: "300px" }}>
      <Card className="h-72">
        <CardHeader>
          <CardTitle>Incluir Novo PDV</CardTitle>
        </CardHeader>

        <CardContent className="p-6 gap-2 flex flex-col flex-1">
            <div>
                <Label>Descrição</Label>
                <Input />
            </div>
            <div>
                <Label>Empresa</Label>
                <Input  />
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
  )
}

export default ModalInserirNovoUsuario