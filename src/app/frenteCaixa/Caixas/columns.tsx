// src/client/components/globals/columns.ts

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeioPgto, Configuracao } from "./types";

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

// Colunas para a Tabela de Configuração (Configuracao)
export const configuracaoColumns: ColumnDef<Configuracao>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nomeCampo",
    header: "Descrição",
  },
  {
    accessorKey: "stringValue",
    header: "Valor",
  },
  {
    accessorKey: "integerValue",
    header: "Valor",
  },
  {
    accessorKey: "doubleValue",
    header: "Valor",
  },
  {
    accessorKey: "dateValue",
    header: "Data",
  }
];
