import { TypeComprasGeralResponse } from "./typeCompras";
import { TypeDashboardMetaHeader } from "./typeMetas";

/**
 * Totais por empresa retornados pela API do dashboard de vendas
 */
export type TotaisPorEmpresa = {
  lcpr_codempresa: string;
  total_cupons: number;
  total_vendas: number;
  ticket_medio: number;
};

/**
 * Totais gerais de vendas
 */
export type TotaisGerais = {
  total_cupons: number;
  total_vendas: number;
  ticket_medio: number;
};

type TypeRelacao = {
  relacaoValue: number
  relacaoPorcentagem: number
}

/**
 * Header do dashboard de vendas
 */
export type TypeDashboardHeader = {
  totais_por_empresa: TotaisPorEmpresa[];
  total_geral: TotaisGerais;
  metas: TypeDashboardMetaHeader;
  relacao: TypeRelacao
  compras: TypeComprasGeralResponse; 
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
