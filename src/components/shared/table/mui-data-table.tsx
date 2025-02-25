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
  // Callback para clique na linha – o pai controla o modal
  onRowClick?: (rowData: any) => void;
}

const defaultLocaleText: DataGridProps["localeText"] = {
  columnMenuLabel: "Menu da Coluna",
  columnMenuSortAsc: "Ordenar Crescente",
  columnMenuSortDesc: "Ordenar Decrescente",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar Coluna",
  columnMenuShowColumns: "Mostrar Colunas",
  columnMenuManageColumns: "Definir Colunas",
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
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40} // Altura menor para deixar a linha mais fina
        disableRowSelectionOnClick
        localeText={defaultLocaleText}
        onRowClick={handleRowClick}
        sx={{
          backgroundColor: "var(--bg-sidebar)",
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "var(--bg-sidebar)",
            color: "#1D4ED8",
            fontSize: "1rem",
            borderBottom: "0.2px solid rgba(0,0,0,0.12)", // linha de cabeçalho mais fina
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "var(--bg-sidebar)",
            color: "#374151",
            borderBottom: "1px solid rgba(0,0,0,0.05)", // borda das células mais fina
          },
          "& .MuiDataGrid-row": {
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(29, 78, 216, 0.1)",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "var(--bg-sidebar)",
            borderTop: "none",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
        }}
        {...rest}
      />
    </Paper>
  );
};

export default DataTableComponentMui;
