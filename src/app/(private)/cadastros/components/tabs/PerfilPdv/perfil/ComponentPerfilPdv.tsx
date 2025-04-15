import DataTableComponentMui from "@/components/shared/table/mui-data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


const ComponentPerfilPdv = () => {
    

    return(
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
            </CardHeader>

            <CardContent>
                <DataTableComponentMui 
                    rows={undefined} 
                    columns={[]}                
                />
            </CardContent>

            <CardFooter>
                <Button>Incluir</Button>
                <Button variant={"secondary"}>Opções</Button>
            </CardFooter>
        </Card>
    )
}

export default ComponentPerfilPdv