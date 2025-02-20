import { ColumnDef } from "@tanstack/react-table"
import { PerfilPdv } from "./types"

export const columnsPerfisDeCaixa: ColumnDef<PerfilPdv>[] = [
    {
        header: "ID",
        accessorKey: "id"
    },
    {
        header: "Descrição",
        accessorKey: "descricao"
    }
]
