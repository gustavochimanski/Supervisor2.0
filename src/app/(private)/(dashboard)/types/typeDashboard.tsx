/**
 * Totais por empresa retornados pela API do dashboard de vendas
 */
export type TotaisPorEmpresa = {
  lcpr_codempresa: string;
  total_cupons: number;
  total_vendas: number;
  ticket_medio: number;
  margem: number;
};

/**
 * Totais gerais de vendas
 */
export type TotaisGerais = {
  total_cupons: number;
  total_vendas: number;
  ticket_medio: number;
  margem: number;
};

/**
 * Header do dashboard de vendas
 */
export type TypeDashboardHeader = {
  totais_por_empresa: TotaisPorEmpresa[];
  total_geral: TotaisGerais;
  total_geral_somado_empresas?: number;
  metas: TypeDashboardMetaHeader;
};

/**
 * Filtros usados no dashboard (payload enviado)
 */
export type TypeFiltroRelatorio = {
  empresas: string[];
  dataInicio: string;
  dataFinal: string;
  situacao?: string;
  status_venda?: string;
  cod_vendedor?: string;
};

/**
 * Totais de metas por empresa
 */
export type TotaisPorEmpresaMeta = {
  codempresa: string;
  valorMeta: number;
};

/**
 * Totais gerais de metas
 */
export type TotaisGeraisMeta = {
  valorMeta: number;
};

/**
 * Header do dashboard de metas
 */
export type TypeDashboardMetaHeader = {
  totais_por_empresa: TotaisPorEmpresaMeta[];
  total_geral: TotaisGeraisMeta;
};
