// Definição do objeto de configuração (cada item do array "configuracao")
export type ConfiguracaoMeioPag = {
    id: number;
    mpgtoId: number;
    mpgtoCodigo: string;
    readonly nomeCampo: string;
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
  