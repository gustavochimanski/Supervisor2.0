
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeioPgto} from "./types";

// Colunas para a Tabela Principal (MeioPgto)
export const meioPgtoColumns: ColumnDef<MeioPgto>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "codigo",
    header: "Código",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "tipoMeioPgto",
    header: "Tipo",
  },
  // Removemos a coluna de ações
];

