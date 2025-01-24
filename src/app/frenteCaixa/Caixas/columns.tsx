// src/client/components/globals/columns.ts

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeioPgto, ConfiguracaoMeioPag } from "./types";

// Colunas para a Tabela Principal (MeioPgto)
export const meioPgtoColumns: ColumnDef<MeioPgto>[] = [
  {
    accessorKey: "id",
    header: "ID",
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

