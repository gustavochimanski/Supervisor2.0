import { useQuery } from "react-query";
import { fetchProdutos } from "../services/ProdutosService";

export const useFetchProdutos = () => {
    return useQuery("produtos", fetchProdutos, {
      staleTime: 60 * 1000, // cache de 1 minuto
    });
  };