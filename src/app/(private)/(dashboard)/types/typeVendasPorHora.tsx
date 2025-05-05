export type VendasPorHora = {
    hora: number;
    total_cupons: number;
    total_vendas: number;
    ticket_medio: number;
  };
  
  export type EmpresaVendasPorHora = {
    empresa: string;
    vendasPorHora: VendasPorHora[];
  };