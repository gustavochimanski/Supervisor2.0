"use client"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CardContent } from "@mui/material"
import { CircleCheck, CircleX } from "lucide-react"

type Props = {
  dataSSR: any;
  modoEdicao?: boolean;
  setModoEdicao?: (ativo: boolean) => void;
}

const ComponentConfigPerfilPDV = ({dataSSR, modoEdicao, setModoEdicao} : Props) => {
  if (!dataSSR) return <div>Selecione um <strong>caixa</strong> para visualizar.</div>

  console.log(modoEdicao)
  const confPerfil = dataSSR.perfilPdv?.confPerfil
  if (!confPerfil || !Array.isArray(confPerfil)) {
    return <div>Nenhuma configuração encontrada.</div>
  }
  

  return (
    <Card className="text-muted-foreground">
      <CardTitle className="p-4 pb-0">Configurações <strong>{dataSSR.descricao}</strong></CardTitle>
      <CardContent className="flex flex-wrap gap-4 text-xs">
        {confPerfil.map((config: any) => (
          <div
            key={config.id}
            className="flex flex-col w-[calc(50%-0.5rem)] min-w-[50px] max-w-[100px]"
          >
            <label className="font-semibold">{config.property}</label>
            <Input
              defaultValue={config.value}
              name={config.property}
              className="h-6"
              disabled={!modoEdicao}
            />
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button>
          <CircleCheck />Gravar
        </Button>
        <Button variant="secondary" onClick={() => setModoEdicao!(false)}>
          <CircleX />Cancelar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ComponentConfigPerfilPDV
