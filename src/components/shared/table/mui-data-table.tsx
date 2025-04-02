import React from "react";
import {
  DataGrid,
  GridColDef,
  DataGridProps,
  GridRowParams,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export interface DataTableComponentProps
  extends Omit<DataGridProps, "rows" | "columns" | "localeText"> {
  rows: any[] | undefined;
  columns: GridColDef[];
  onRowClick?: (rowData: any) => void;
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

  // ✅ Personalizando paginação
  footerRowSelected: (count) =>
    count > 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,
  footerTotalRows: "Total de linhas:",
};

const DataTableComponentMui: React.FC<DataTableComponentProps> = ({
  rows,
  columns,
  onRowClick,
  ...rest
}) => {

  const handleRowClick = (params: GridRowParams) => {
    if (onRowClick) {
      onRowClick(params.row);
    }
  };

  return (
    <Paper sx={{ height: "75vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40} // ✅ Mais altura para espaço interno (aconselhável)
        disableRowSelectionOnClick
        localeText={defaultLocaleText}
        onRowClick={handleRowClick}
        sx={{
          // ✅ Separador de linhas oficial do MUI
          "--DataGrid-rowBorder": "none",

          // ✅ Background geral
          backgroundColor: "var(--bg-sidebar)",
          border: "none",

          // ✅ Cabeçalho da tabela
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "var(--bg-sidebar)",
            color: "#1D4ED8",
            fontSize: "1rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },

          // ✅ Zebra
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#F9FAFB", // slate-50
          },

          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#FFFFFF", // branco puro
          },

          // ✅ Hover com transição
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#EEF2F6", // slate-100
            transition: "background-color 0.2s ease-in-out",
          },

          // ✅ Células com Fonte melhorado
          "& .MuiDataGrid-cell": {
            fontSize: "0.95rem",
            cursor: "pointer"
          },

          // ✅ Footer clean
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "var(--bg-sidebar)",
            borderTop: "none",
          },

          // ✅ Remove outline azul padrão feio
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },

          // ✅ Remove borda no grid geral
          "& .MuiDataGrid-root": {
            border: "none",
          },
        }}
        {...rest}
      />
    </Paper>
  );
};

export default DataTableComponentMui;
