  import React from "react";
  import {
    DataGrid,
    GridColDef,
    DataGridProps,
    GridRowParams,
    GridCsvExportOptions,
    useGridApiRef,
    GridRowSelectionModel,
  } from "@mui/x-data-grid";
  import Paper from "@mui/material/Paper";

  export interface DataTableComponentProps
  extends Omit<DataGridProps, "rows" | "columns" | "localeText"> {
  rows: any[] | undefined;
  columns: GridColDef[];
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
    apiRef, // <- aqui ele vem do pai
    onRowSelectionModelChange,
    ...rest
  }) => {
    const handleRowClick = (params: GridRowParams) => {
      if (onRowClick) {
        onRowClick(params.row);
      }
    };
  
    return (
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <DataGrid
          apiRef={apiRef} // <- usa o que veio por props
          rows={rows}
          columns={columns}
          rowHeight={40}
          disableRowSelectionOnClick
          checkboxSelection
          paginationModel={{ pageSize: 10, page: 0 }}
          pageSizeOptions={[10, 20, 30]}
          localeText={defaultLocaleText}
          onRowSelectionModelChange={onRowSelectionModelChange}
          onRowClick={handleRowClick}
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            border: "none",
            "--DataGrid-rowBorder": "none",
            backgroundColor: "var(--bg-sidebar)",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--bg-sidebar)",
              color: "#1E40AF",
              fontSize: "0.9rem",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#F9FAFB",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#FFFFFF",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#EEF2F6",
              transition: "background-color 0.2s ease-in-out",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.85rem",
              cursor: "pointer",
              border: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "var(--bg-sidebar)",
              borderTop: "none",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
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
