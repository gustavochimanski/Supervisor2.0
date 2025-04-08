"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CardContent, CardHeader } from "@mui/material"
import { CircleCheck, CircleX } from "lucide-react"

const TabConfigCaixas = ({ data }: { data?: any }) => {
  if (!data) return 
  if (!data.data) return <div>Selecione um item para visualizar.</div>
  
  const confPerfil = data.data.perfilPdv?.confPerfil
  if (!confPerfil || !Array.isArray(confPerfil)) {
    return <div>Nenhuma configuração encontrada.</div>
  }

  return (
    <Card className="text-muted-foreground">

        <CardTitle className="p-4 pb-0">Configurações {data.data.descricao}</CardTitle>
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
            />
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button>
          <CircleCheck />Gravar
        </Button>
        <Button variant="secondary">
          <CircleX />Cancelar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TabConfigCaixas
