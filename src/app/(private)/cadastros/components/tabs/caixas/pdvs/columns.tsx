// columns/caixasColumns.ts
import { GridColDef } from "@mui/x-data-grid";
import { ViewButton } from "@/components/shared/buttons/viewButton";

export const getCaixasColumns = (
  setDadosSelecionados: (row: any) => void
): GridColDef[] => [
  { field: 'id', headerName: 'ID', minWidth: 50, align: "center", headerAlign: 'center' },
  { field: 'descricao', headerName: 'Descrição', minWidth: 120, editable: true },
  {
    field: 'viewModal',
    headerName: 'Ver',
    align: "center",
    headerAlign: "center",
    minWidth: 70,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <ViewButton onClick={() => setDadosSelecionados(params.row)} />
    ),
  },
  { field: 'empresaId', headerName: 'Empresa', minWidth: 80, align: "center", headerAlign: 'center' },
  { field: 'ip', headerName: 'IP', minWidth: 130, align: "center" , editable: true},
  { field: 'tipoSat', headerName: 'Sat', minWidth: 90, align: "center", headerAlign: 'center', editable: true},
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 70,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const isAtivo = params.value === 'S';
      const color = isAtivo ? '#16a34a' : '#dc2626'; // verde ou vermelho
  
      return (
        <span
          style={{
            display: 'inline-block',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: color,
          }}
          title={isAtivo ? 'Ativo' : 'Inativo'} // opcional, mostra tooltip no hover
        />
      );
    },
  },
  
];
