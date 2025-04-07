import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CardContent } from "@mui/material"
import { CircleCheck, CircleX } from "lucide-react"

const TabConfigCaixas = () => {
    return(
        <div>
            <Card>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex gap-4">
                        <div className="w-20 ">
                            <label htmlFor="">Imp</label>
                            <Input className="text-center"  type="number"/>
                        </div>

                        <div className="w-32">
                            <label htmlFor="">Descrição Imp</label>
                            <Input/>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        <div className="w-32">
                            <label htmlFor="">Porta Imp</label>
                            <Input />
                        </div>
                        <div className="w-24">
                            <label htmlFor="">Velocidade</label>
                            <Input className="text-end"/>
                        </div>
                        <div className="w-20">
                            <label htmlFor="">S.Bits</label>
                            <Input className="text-end"/>
                        </div>
                        <div className="w-20">
                            <label htmlFor="">D.Bits</label>
                            <Input className="text-end"/>
                        </div>
                    </div>

                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button><CircleCheck/>Gravar</Button>
                    <Button variant={"secondary"}><CircleX/>Cancelar</Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default TabConfigCaixas