import { GridColDef } from '@mui/x-data-grid';

// Colunas ajustadas para MUI DataGrid
export const caixasColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    width: 50, // sempre defina pelo menos uma largura
  },
  {
    field: 'descricao',
    headerName: 'Descrição',
    flex: 1, // usa o espaço restante de forma proporcional
  },
  {
    field: 'empresaId',
    headerName: 'Empresa',
    width: 150,
  },
];
