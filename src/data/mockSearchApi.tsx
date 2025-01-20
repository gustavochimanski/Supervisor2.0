// mockApi.ts

import { Produto, mockProducts } from "./DataProdutos";

export const mockSearchApi = async (query: string): Promise<Produto[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula um erro ao digitar "erro"
      if (query.toLowerCase() === "erro") {
        reject(new Error("Simulação de erro na API"));
        return;
      }

      // Filtra os produtos com base no nome
      const resultados = mockProducts.filter((produto) =>
        produto.cade_descricao.toLowerCase().includes(query.toLowerCase())
      );

      // Simula resultados encontrados ou não encontrados
      if (resultados.length > 0) {
        resolve(resultados);
      } else {
        resolve([]); // Nenhum resultado
      }
    }, 1000); // Simula um atraso de 1 segundo na resposta
  });
};
export type { Produto };

