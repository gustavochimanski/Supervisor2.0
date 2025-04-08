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
    apiRef, // <- aqui ele vem do pai
    onRowSelectionModelChange,
    columnOrder,
    ...rest
  }) => {
    const handleRowClick = (params: GridRowParams) => {
      if (onRowClick) {
        onRowClick(params.row);
      }
    };

  // REORDENA E APLICA headerAlign e align CENTER COMO PADRÃO
  const orderedColumns = React.useMemo(() => {
    const enhanceColumn = (col: GridColDef): GridColDef => ({
      ...col,
      headerAlign: col.headerAlign ?? "center", // só aplica se não tiver
      align: col.align ?? "center", // só aplica se não tiver
      flex: col.flex ?? 1, // ⬅️ padrão flex: 1
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
          apiRef={apiRef} // <- usa o que veio por props
          rows={rows}
          columns={orderedColumns}
          rowHeight={35}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[10, 20, 30]}
          localeText={defaultLocaleText}
          onRowSelectionModelChange={onRowSelectionModelChange}
          onRowClick={handleRowClick}
          sx={{
            flex: 1,
            minHeight: 0,
            border: "none",
            "--DataGrid-rowBorder": "none",
            backgroundColor: "var(--bg-sidebar)",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--bg-sidebar)",
              color: "#9ca3af",
              fontSize: "0.87rem",
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
              transition: "background-color 0.05s ease-in-out",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.85rem",
              border: "none",
              color: "#858585",
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
            "& .cell-status-ativo": {
              color: "green",
              fontWeight: 600,
            },
            "& .cell-status-inativo": {
              color: "red",
              fontWeight: 600,
            },
          }}
          {...rest}
        />
      </Paper>
    );
  };
  

  export default DataTableComponentMui;
