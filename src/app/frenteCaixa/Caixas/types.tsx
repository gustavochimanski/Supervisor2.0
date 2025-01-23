// Definição do objeto de configuração (cada item do array "configuracao")
export type ConfiguracaoMeioPag = {
    opcoes: any;
    id: number;
    mpgtoId: number;
    mpgtoCodigo: string;
    nomeCampo: string;
    stringValue: string;
    integerValue: number;
    doubleValue: number;
    dateValue: string | null;
  };
  
  // Definição do objeto principal (Meio de Pagamento)
  export type MeioPgto = {
    id: number;
    codigo: string;
    descricao: string;
    tipoMeioPgto: string;
    configuracao: ConfiguracaoMeioPag[];
    configEmpresa: [];
  };
  