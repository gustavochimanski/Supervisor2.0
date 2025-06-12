"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SearchComponent } from "@/components/shared/searchComponent";
import { useFetchAllMeiosPgto } from "../../../../hooks/useMeioPag";
import { CirclePlus, RefreshCcw, ArrowRightCircle, Barcode, EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import { GridColDef } from "@mui/x-data-grid";

interface Props {
  onRowSelect: (id: string) => void;
}

export default function ComponentMeioPagamento({ onRowSelect }: Props) {
  const { data: dataAllMeioPgto } = useFetchAllMeiosPgto();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "descricao", headerName: "Descrição", width: 300 },
    { field: "tipoMeioPgto", headerName: "Tipo", width: 70 },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <DataTableComponentMui
        rows={dataAllMeioPgto || []}
        columns={columns}
        onRowClick={(rowData: any) => onRowSelect(rowData.id.toString())}
      />
    </div>
  );
}
