import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CardContent } from "@mui/material"
import { CircleCheck, CircleX } from "lucide-react"
import { useEffect, useState } from "react"


const TabConfigCaixas = ({ data }: { data?: any }) => {
if (!data) return <div>Selecione um item para visualizar.</div>;

return (
    <Card className="text-muted-foreground">
    <CardContent className="flex flex-col gap-3 text-xs">
        <div className="flex gap-4 ">
        <div className="w-20 ">
            <label htmlFor="">Imp</label>
            <Input
            className="text-center h-5"
            type="number"
            defaultValue={data.imp}
            name="imp"
            />
        </div>

        <div className="w-32">
            <label htmlFor="">Descrição Imp</label>
            <Input
            className="h-5"
            defaultValue={data.descricaoImp}
            name="descricaoImp"
            />
        </div>
        </div>

        <div className="flex flex-wrap gap-2">
        <div className="w-32">
            <label htmlFor="">Porta Imp</label>
            <Input className="h-5" defaultValue={data.portaImp} name="portaImp" />
        </div>
        <div className="w-24">
            <label htmlFor="">Velocidade</label>
            <Input className="text-end h-5" defaultValue={data.velocidade} name="velocidade" />
        </div>
        <div className="w-20">
            <label htmlFor="">S.Bits</label>
            <Input className="text-end h-5" defaultValue={data.sBits} name="sBits" />
        </div>
        <div className="w-20">
            <label htmlFor="">D.Bits</label>
            <Input className="text-end h-5" defaultValue={data.dBits} name="dBits" />
        </div>
        </div>
    </CardContent>

    <CardFooter className="flex justify-between">
        <Button><CircleCheck />Gravar</Button>
        <Button variant={"secondary"}><CircleX />Cancelar</Button>
    </CardFooter>
    </Card>
);
};

export default TabConfigCaixas;
