// columns/caixasColumns.ts
import { Button } from "@/components/ui/button";
import { GridColDef } from "@mui/x-data-grid";
import { Eye } from "lucide-react";
import { TypeCaixas } from "../../../../types/typesCaixas";

export const getCaixasColumns = (
  handleOpenVisualizarModal: (row: TypeCaixas) => void
): GridColDef[] => [
  { field: 'id', headerName: 'ID', width: 50, align: "center", headerAlign: 'center' },
  { field: 'descricao', headerName: 'Descrição', width: 200, editable: true },
  {
    field: 'viewModal',
    headerName: 'Ver',
    align: "center",
    headerAlign: "center",
    minWidth: 1,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleOpenVisualizarModal(params.row)}
        className="text-blue-700 "
      >
        <Eye size={18} />
      </Button>
    ),
  },
  { field: 'empresaId', headerName: 'Empresa', width: 100, align: "center", headerAlign: 'center' },
  { field: 'ip', headerName: 'IP', width: 130, align: "center" , editable: true},
  { field: 'tipoSat', headerName: 'Tipo Sat', width: 80, align: "center", headerAlign: 'center', editable: true},
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
