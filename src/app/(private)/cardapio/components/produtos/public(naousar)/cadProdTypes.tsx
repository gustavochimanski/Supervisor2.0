export type TypeCadProd = {
  cadp_codigo: number;
  cadp_situacao: string;
  cadp_descricao: string;
  cadp_complemento: string;
  cadp_codcategoria: number;
  cadp_categoria: string;
  cadp_codmarca: number;
  cadp_marca: string;
  cadp_diretivas: string;
  cadp_dtcadastro: string; // pode ser Date se for convertido depois
  cadp_balanca: string;
  cadp_codigobarra: string;
  cadp_controlaestoque: string;
  cadp_vincpreco: number;
  cadp_pesoun: number;
  cadp_pesoemb: number;
  cadp_codvasilhame: string;
};

export type TypeCadProdResponse = {
  data: TypeCadProd[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
};
