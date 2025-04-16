export type TypeDashboardHeader = {
    total_cupons: string;
    total_vendas: string;
    ticket_medio: string;
    total_descontos: string;
}

export type TypeFiltroRelatorio = {
    empresa: string;
    dataInicial: string; // formato: 'YYYY-MM-DD'
    dataFinal: string;   // formato: 'YYYY-MM-DD'
}