import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "descricao",
    headerName: "Descrição",
    width: 300,
    align: "left",
    headerAlign: "left",
  },
];
