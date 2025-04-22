/**
 * Totais de compras por empresa (agrupado por status)
 */
export type TypeTotalCompraEmpresa = {
    empresa: string;
    valorPendentes: number;
    quantidadePendentes: number;
    valorAutorizadas: number;
    quantidadeAutorizadas: number;
    valorCanceladas: number;
    quantidadeCanceladas: number;
    valorTotal: number;
    quantidadeTotal: number;
  };
  
  /**
   * Resultado completo de compras no período
   */
  export type TypeComprasPeriodo = {
    por_empresa: TypeTotalCompraEmpresa[];
    valorTotal: number;
    quantidadeTotal: number;
  };
  