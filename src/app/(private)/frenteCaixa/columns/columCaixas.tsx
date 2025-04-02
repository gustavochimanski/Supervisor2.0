import { GridColDef } from '@mui/x-data-grid';

// Colunas ajustadas para MUI DataGrid
export const caixasColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    width: 50, 
  },
  {
    field: 'descricao',
    headerName: 'Descrição',
    width: 300, 
  },
  {
    field: 'empresaId',
    headerName: 'Empresa',
    width: 150,
  },
];
