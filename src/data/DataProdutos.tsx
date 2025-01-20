// DataProdutos.ts
export interface Produto {
  cade_codigo: number;
  cade_preco: number;
  cade_categoria: string;
  cade_barras?: string
  cade_descricao: string;
}

// mockSearchApi.ts
export const mockProducts: Produto[] = [
  { cade_codigo: 1, cade_descricao: "Tênis Nike", cade_preco: 299.99, cade_categoria: "Calçados", cade_barras: "234234234"},
  { cade_codigo: 2, cade_descricao: "Camiseta Adcade_codigoas", cade_preco: 99.99, cade_categoria: "Roupas", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234"},
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
  { cade_codigo: 3, cade_descricao: "Mochila Puma", cade_preco: 149.99, cade_categoria: "Acessórios", cade_barras: "234234234" },
];

