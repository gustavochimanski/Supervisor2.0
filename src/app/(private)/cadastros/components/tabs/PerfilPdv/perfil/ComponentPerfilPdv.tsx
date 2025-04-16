import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPerfilCaixaColumns } from "./columns";

type Props = {
  data: any;
  setRowSelected: (row: any) => void;
  setModoEdicao: (ativo: boolean) => void;
};

const ComponentPerfilPdv = ({
  data,
  setRowSelected,
  setModoEdicao,
}: Props) => {
    const columns = getPerfilCaixaColumns(setRowSelected, setModoEdicao);


  return (
    <div className="flex flex-col flex-1 h-full">
      <CardHeader>
        <CardTitle>Perfis de Caixa</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        <DataTableComponentMui
          rows={data}
          columns={columns}
          onRowClick={(row: any) => {
            setRowSelected(row);
            setModoEdicao(false);
          }}
        />
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button >Incluir</Button>
        <Button  variant="secondary">Opções</Button>
      </CardFooter>
    </div>
  );
};

export default ComponentPerfilPdv;
