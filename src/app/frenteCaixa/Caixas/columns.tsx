"use client";

import { ColumnDef } from "@tanstack/react-table";

// Tipo que reflete o que o back-end retorna,
// *mais* as antigas props que você quer manter (opcionais).
export type MeiosDePagamento = {
  id: number;
  mpgtoId: number;
  mpgtoCodigo: string;
  nomeCampo: string;
  stringValue: string;
  integerValue: number;
  doubleValue: number;
  dateValue: string | null;
};

export const configuracaoColumns: ColumnDef<MeiosDePagamento>[] = [


  // Colunas que refletem a resposta "configuracao" da API
  {
    accessorKey: "mpgtoCodigo",
    header: "Código",
  },
  {
    accessorKey: "nomeCampo",
    header: "Nome do Campo",
  },
  {
    accessorKey: "stringValue",
    header: "Valor (String)",
  },
  {
    accessorKey: "integerValue",
    header: "Valor (Inteiro)",
  },
  {
    accessorKey: "doubleValue",
    header: "Valor (Double)",
  },
  {
    accessorKey: "dateValue",
    header: "Data",
  },
];
