export type TypeVendasPorHora = {
    hora: number;
    total_cupons: number;
    total_vendas: number;
    ticket_medio: number;
  };
  
  export interface TypeVendaPorHoraResponse {
    empresa: string;                         
    vendasPorHora: TypeVendasPorHora[];       
  }