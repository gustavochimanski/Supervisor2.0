"use client";

import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  DataGridProps,
  GridRowParams,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export interface DataTableComponentProps
  extends Omit<DataGridProps, 'rows' | 'columns' | 'localeText'> {
  rows: any[] | undefined;
  columns: GridColDef[];
  // Callback para clique na linha – o pai controla o modal
  onRowClick?: (rowData: any) => void;
}

const defaultLocaleText: DataGridProps['localeText'] = {
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
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick // Essa prop impede que o clique na linha selecione o item
        localeText={defaultLocaleText}
        onRowClick={handleRowClick}
        sx={{
          backgroundColor: 'var(--bg-sidebar)',
          border: 'none',
          // Cabeçalhos minimalistas com blue-700
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: 'var(--bg-sidebar)',
            color: '#1D4ED8', // blue-700 (hex: #1D4ED8)
            fontSize: '1rem',
            borderBottom: '1px solid rgba(0,0,0,0.12)',
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },
          // Células com fundo consistente e borda sutil
          "& .MuiDataGrid-cell": {
            backgroundColor: 'var(--bg-sidebar)',
            color: '#374151', // tom escuro minimalista
            borderBottom: '1px solid rgba(0,0,0,0.05)',
          },
          // Linhas com cursor pointer e hover sutil em blue-700 com opacidade
          "& .MuiDataGrid-row": {
            cursor: "pointer",
            "&:hover": {
              backgroundColor: 'rgba(29, 78, 216, 0.1)', // blue-700 com 10% de opacidade
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: 'var(--bg-sidebar)',
            borderTop: 'none',
          },
          // Remove outlines de foco
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
            outline: 'none',
          },
        }}
        {...rest}
      />
    </Paper>
  );
};

export default DataTableComponentMui;
