/**
 * Totais de compras por empresa (agrupado por status)
 */
export type TypeTotalCompraEmpresaResponse = {
    empresa: string
    valor: number
  };
  
  /**
   * Resultado completo de compras no período
   */
  export type TypeComprasGeralResponse = {
    por_empresa: TypeTotalCompraEmpresaResponse[];
    total_geral: number
  };
  