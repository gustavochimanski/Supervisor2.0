import { ColumnDef } from "@tanstack/react-table"
import { PerfilPdv } from "./types"

export const columnsPerfisDeCaixa: ColumnDef<PerfilPdv>[] = [
    {
        header: "Id",
        accessorKey: "id"
    },
    {
        header: "Descrição",
        accessorKey: "descricao"
    }
]
