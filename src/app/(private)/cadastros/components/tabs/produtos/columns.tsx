// columns/produtosColumns.ts
import { GridColDef, GridRenderEditCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Pencil } from "lucide-react";
import { Select, SelectContent,  SelectItem, SelectTrigger } from "@/components/ui/select";

export const getProdutosColumns = (
  setModalAberto: (aberto: boolean) => void
): GridColDef[] => [
  {
    field: 'edit',
    headerName: 'Editar',
    align: "center",
    headerAlign: "center",
    minWidth: 70,
    sortable: false,
    filterable: false,
    renderCell: () => (
      <IconButton
        color="primary"
        onClick={() => setModalAberto(true)}
      >
        <Pencil size={18} />
      </IconButton>
    ),
  },
  { field: 'Código', headerName: 'Código', minWidth: 80, align: "center", headerAlign: 'center', type: "number" },
  { field: 'Descrição', headerName: 'Descrição', minWidth: 160, editable: true },
  { field: 'Emp', headerName: 'Emp', minWidth: 60, align: "center", headerAlign: 'center' },
  { field: 'Descrição Reduzida', headerName: 'Descrição Reduzida', minWidth: 140, editable: true },
  { field: 'Comple', headerName: 'Complemento', minWidth: 120, editable: true },
  { field: 'Cod. Categ.', headerName: 'Cod. Categ.', minWidth: 100, align: "center", headerAlign: 'center', editable: true, type: "number" },
  { field: 'Catego', headerName: 'Categoria', minWidth: 120 },
  { field: 'Cod. Marca', headerName: 'Cod. Marca', minWidth: 100, align: "center", headerAlign: 'center', editable: true, type: "number" },
  { field: 'Marca', headerName: 'Marca', minWidth: 120 },
  { field: 'Diretiva', headerName: 'Diretiva', minWidth: 100, editable: true },
  {
    field: 'Bal.',
    headerName: 'Balança',
    minWidth: 90,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (params.value ? 'Sim' : 'Não'),
    editable: true
  },
  { field: 'Codigo Barras', headerName: 'Código Barras', minWidth: 140, editable: true, type: "number" },
  { field: 'Codigo NCM', headerName: 'NCM', minWidth: 100, editable: true, type: "number" },
  {
    field: 'Vasilh.',
    headerName: 'Vasilhame',
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (params.value ? 'Sim' : 'Não'),
    editable: true
  },
  { field: 'CST', headerName: 'CST', minWidth: 70, editable: true },
  { field: 'Cst Pis', headerName: 'CST PIS', minWidth: 80, editable: true },
  { field: 'Pis', headerName: 'PIS (%)', minWidth: 80, align: "center", headerAlign: 'center', editable: true },
  { field: 'Cst Cofins', headerName: 'CST COFINS', minWidth: 100, editable: true },
  { field: 'Cofins', headerName: 'COFINS (%)', minWidth: 100, align: "center", headerAlign: 'center', editable: true },
  { field: 'Cest', headerName: 'CEST', minWidth: 100, editable: true },
  { field: 'CTS', headerName: 'CTS', minWidth: 80, editable: true },
  {
    field: "Ativo",
    headerName: "Ativo",
    minWidth: 100,
    editable: true,
    align: "center",
    headerAlign: "center", 
    renderCell: (params) => {
      const isAtivo = params.value === true;
      const color = isAtivo ? "#16a34a" : "#dc2626";
  
      return (
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: color,
          }}
          title={isAtivo ? "Ativo" : "Inativo"}
        />
      );
    },
    renderEditCell: (params: GridRenderEditCellParams) => {
      const handleChange = (value: string) => {
        params.api.setEditCellValue({
          id: params.id,
          field: params.field,
          value: value === "true",
        });
      };
  
      return (
        <Select
          defaultValue={String(params.value)}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-[100px] h-8" />
          <SelectContent>
            <SelectItem value="A">Ativo</SelectItem>
            <SelectItem value="F">Inativo</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    field: 'Bloq.',
    headerName: 'Bloqueado',
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    editable: true,
    renderCell: (params) => (params.value ? 'Sim' : 'Não')
  },
  { field: 'Pr. Venda', headerName: 'Pr Venda', minWidth: 100, editable: true, type: "number" },
  { field: 'Pr. Venda 1', headerName: 'Pr Venda 1', minWidth: 110, editable: true, type: "number" },
  { field: 'Pr. Venda 2', headerName: 'Pr Venda 2', minWidth: 110, editable: true, type: "number"},

];

export const nfceColumnOrder: string[] = [
  "Código",
  "Emp",
  "edit",
  "Descrição", // Corrigido para evitar erro de binding se você usar campos camelCase
  "Codigo Barras",
  "Pr. Venda",
  "Catego",
  "Ativo",
  "Descricao Reduzida",
  "Codigo NCM",
  "CST",
  "Cst Pis",
  "Pis",
  "Cst Cofins",
  "Cofins",
  "Pr. Venda 1",
  "Pr. Venda 2",
  "Bloq.",
  "Bal.",
  "Vasilh.",
  "Cod. Categ.",
  "Cod. Marca",
  "Marca",
  "Diretiva",
  "Comple",
  "CTS",
];

