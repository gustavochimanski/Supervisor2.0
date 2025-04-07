import { GridColDef } from "@mui/x-data-grid";

export const nfceColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 60, align: "center", headerAlign: "center" },
  { field: "empresa", headerName: "Empresa", width: 80 },
  { field: "pdv", headerName: "PDV", width: 80 },
  { field: "dataMvto", headerName: "Data Mvto", width: 140 },
  { field: "dataHoraEmitido", headerName: "Dt/Hora Emitido", width: 160 },
  { field: "dataHoraCancelado", headerName: "Dt/Hora Cancelado", width: 160 },
  { field: "sit", headerName: "Sit", width: 60 },
  { field: "cupom", headerName: "Cupom", width: 80 },
  { field: "dcto", headerName: "Dcto", width: 100 },
  { field: "serie", headerName: "Série", width: 60 },
  { field: "cnpjCpf", headerName: "CNPJ/CPF", width: 140 },
  { field: "chave", headerName: "Chave Dcto", width: 280 },
  { field: "protocolo", headerName: "Protocolo", width: 140 },
  { field: "protocoloCanc", headerName: "Protocolo Canc", width: 140 },
  { field: "valor", headerName: "Valor Dcto", width: 100, type: "number" },
  {
    field: "sit",
    headerName: "Status",
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const value = params.value;
      let color = "";
      let title = "";

      switch (value) {
        case "A":
          color = "#22c55e"; title = "Autorizado"; break;
        case "P":
          color = "#facc15"; title = "Pendente"; break;
        case "C":
          color = "#ef4444"; title = "Cancelado"; break;
        case "I":
          color = "#fb923c"; title = "Inutilizado"; break;
        default:
          color = "#9ca3af"; title = "Desconhecido";
      }

      return (
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: color,
          }}
          title={title}
        />
      );
    },
  },
  { field: "motivo", headerName: "Motivo", width: 160 },
  { field: "supCanc", headerName: "Sup. Canc", width: 90 },
  { field: "nomeSupCanc", headerName: "Nome Sup. Canc", width: 160 },
];
