
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeCaixas } from "./types";

// Colunas para a Tabela Principal 
export const caixasColumns: ColumnDef<TypeCaixas>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "empresaId",
    header: "Empresa",
  },
  // Removemos a coluna de ações
];

