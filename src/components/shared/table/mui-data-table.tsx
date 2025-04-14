import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  DataGridProps,
  GridRowParams,
  useGridApiRef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export interface DataTableComponentProps
  extends Omit<DataGridProps, "rows" | "columns" | "localeText"> {
  rows: any[] | undefined;
  columns: GridColDef[];
  columnOrder?: string[]; // Reordena as colunas
  onRowClick?: (rowData: any) => void;
  onRowSelectionModelChange?: (ids: GridRowSelectionModel) => void;
  apiRef?: ReturnType<typeof useGridApiRef>;
}

// Tradução dos textos padrão do DataGrid
const defaultLocaleText: DataGridProps["localeText"] = {
  columnMenuLabel: "Menu da Coluna",
  columnMenuSortAsc: "Ordenar Crescente",
  columnMenuSortDesc: "Ordenar Decrescente",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar Coluna",
  columnMenuShowColumns: "Mostrar Colunas",
  columnMenuManageColumns: "Definir Colunas",
  footerTotalRows: "Total de linhas:",
  // Pagination buttons
  MuiTablePagination: {
    labelRowsPerPage: "Linhas por página",
    labelDisplayedRows: ({ from, to, count }) => `${from}–${to} de ${count}`,
  },
};

const DataTableComponentMui: React.FC<DataTableComponentProps> = ({
  rows,
  columns,
  onRowClick,
  apiRef, // <- vem do pai
  onRowSelectionModelChange,
  columnOrder,
  ...rest
}) => {
  const handleRowClick = (params: GridRowParams) => {
    if (onRowClick) {
      onRowClick(params.row);
    }
  };

  // Reordena e aplica headerAlign e align CENTER como padrão
  const orderedColumns = React.useMemo(() => {
    const enhanceColumn = (col: GridColDef): GridColDef => ({
      ...col,
      headerAlign: col.headerAlign ?? "center", // só aplica se não tiver
      align: col.align ?? "center", // só aplica se não tiver
      flex: col.flex ?? 1, // padrão flex: 1
    });

    const finalColumns = columns.map(enhanceColumn);

    if (!columnOrder) return finalColumns;

    const map = new Map(finalColumns.map((col) => [col.field, col]));
    return columnOrder.map((field) => map.get(field)).filter(Boolean) as GridColDef[];
  }, [columns, columnOrder]);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden", // <- importante
      }}
    >
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={orderedColumns}
        rowHeight={35}
        checkboxSelection
        disableRowSelectionOnClick
        localeText={defaultLocaleText}
        onRowSelectionModelChange={onRowSelectionModelChange}
        onRowClick={handleRowClick}
        sx={{
          flex: 1,
          minHeight: 0,
          border: "none",
          "--DataGrid-rowBorder": "none",
          backgroundColor: "hsl(var(--card))",
          color: "hsl(var(--foreground))",

          // HEADER DA TABELA
          "& .MuiDataGrid-columnHeaders": {
            color: "hsl(var(--muted-foreground))",
            borderBottom: "1px solid hsl(var(--border))",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "hsl(var(--border))",
            visibility: "visible",
            width: "1px",
            opacity: 0.2,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "hsl(var(--muted))",
            fontWeight: 600,
            fontSize: "0.75rem", // text-xs (~12px)
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },

          // LINHAS
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "hsl(var(--background))",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "hsl(var(--muted))",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "hsl(var(--input))",
          },

          // CÉLULAS
          "& .MuiDataGrid-cell": {
            fontSize: "0.75rem", // text-xs
            border: "none",
            color: "hsl(var(--inputValue))",
          },

          // FOOTER
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "hsl(var(--card))",
            borderTop: "1px solid hsl(var(--border))",
            color: "hsl(var(--muted-foreground))",
            fontSize: "0.75rem",
          },

          // Foco
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },

          // Border geral
          "& .MuiDataGrid-root": {
            border: "none",
          },

          // Status custom
          "& .cell-status-ativo": {
            color: "hsl(var(--chart-2))",
            fontWeight: 600,
          },
          "& .cell-status-inativo": {
            color: "hsl(var(--destructive))",
            fontWeight: 600,
          },

          // Estilização da paginação
          "& .MuiTablePagination-root": {
            color: "hsl(var(--muted-foreground))",
            fontSize: "0.75rem",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "hsl(var(--muted-foreground))",
            fontSize: "0.75rem",
          },
          "& .MuiSelect-select": {
            color: "hsl(var(--foreground))",
            backgroundColor: "hsl(var(--card))",
          },
          "& .MuiSvgIcon-root": {
            color: "hsl(var(--foreground))",
          },

          // Checkbox (ícone SVG)
          "& .MuiCheckbox-root .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        }}
        {...rest}
      />
    </Paper>
  );
};

export default DataTableComponentMui;
