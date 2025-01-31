export interface ConfigPerfilPdv {
    id: number
    property: string
    value: string,
    perfilId: number 
}

export interface PerfilPdv{
    id: number
    descricao: string
    confPerfil: ConfigPerfilPdv[];
}

export interface FormDataperfil {
    Impressora: string;
    ImpressoraPorta: string;
    ImpressoraBaudRate: string;
    ImpressoraParity: string;
    ImpressoraStopBits: string;
    ImpressoraDataBits: string;
    Scanner: string;
    ScannerPorta: string;
    ScannerBaudRate: string;
    ScannerParity: string;
    ScannerStopBits: string;
    ScannerDataBits: string;
    Balanca: string;
    BalancaPorta: string;
    BalancaBaudRate: string;
    BalancaParity: string;
    BalancaStopBits: string;
    BalancaDataBits: string;
    BalancaTimeOut: string;
    Teclado: string;
    CodigoPrecoVenda: string;
  }
  