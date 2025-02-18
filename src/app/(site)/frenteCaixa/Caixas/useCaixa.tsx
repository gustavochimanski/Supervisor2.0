import { useQuery } from "react-query"
import { TypeCaixas } from "./types"
import { fetchAllCaixas, fetchByIdCaixas } from "./service"
import { PerfilPdv } from "../PerfisDeCaixa/types";

// Hook para Buscar Todos os Caixas
export const useFetchAllCaixas = () => {
    return useQuery<TypeCaixas[]>('fetchAllCaixas', fetchAllCaixas, {
        staleTime: 60 *1000,
    })
};

// Hook para buscar um perfil por ID
export const useFetchByIdCaixa = (id: string | undefined) => {
  return useQuery<TypeCaixas>(
    ['fetchPerfilPdvById', id],
    () => fetchByIdCaixas(id!),
    {
      enabled: !!id, // Só executa se houver um ID
      staleTime: 60 * 1000,
    }
  );
};