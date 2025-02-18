// types/meioPagamentoTypes.ts
export type ConfiguracaoMeioPag = {
  id: number;
  mpgtoId: number;
  mpgtoCodigo: string;
  nomeCampo: string;
  stringValue: string;
  integerValue: number;
  doubleValue: number;
  dateValue: string | null;
};

export type MeioPgto = {
  id: number;
  codigo: string;
  descricao: string;
  tipoMeioPgto: string;
  configuracao: ConfiguracaoMeioPag[];
  configEmpresa: [];
};