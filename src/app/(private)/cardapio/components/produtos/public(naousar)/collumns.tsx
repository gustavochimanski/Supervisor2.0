import { GridColDef } from "@mui/x-data-grid";
import { TypeCadProd } from "./cadProdTypes";

// Ordem das colunas visíveis
export const CadProdColumnOrder: string[] = [
  "cadp_codigo",
  "cadp_codigobarra",
  "cadp_descricao",
  "cadp_categoria",
  "cadp_marca",
  "cadp_diretivas",
  "cadp_dtcadastro"
];

// Colunas definidas para o DataGrid
export const CadProdCols: GridColDef<TypeCadProd>[] = [
  {
    field: "cadp_codigo",
    headerName: "Código",
    width: 120,
  },
  {
    field: "cadp_descricao",
    headerName: "Descrição",
    width: 280,
  },
  {
    field: "cadp_codigobarra",
    headerName: "Código de Barras",
    width: 180,
  },
  {
    field: "cadp_categoria",
    headerName: "Categoria",
    width: 180,
  },
  {
    field: "cadp_marca",
    headerName: "Marca",
    width: 150,
  },
  {
    field: "cadp_diretivas",
    headerName: "Diretivas",
    width: 160,
  },
  {
    field: "cadp_dtcadastro",
    headerName: "Data de Cadastro",
    width: 160,
    valueGetter: (params:any) =>
      params.row?.cadp_dtcadastro
        ? new Date(params.row.cadp_dtcadastro).toLocaleDateString("pt-BR")
        : "-",
  },
];
