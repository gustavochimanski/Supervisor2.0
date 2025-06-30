import { useQuery } from "react-query";
import { TypeCadProdResponse } from "./cadProdTypes";
import { fetchProdutosPaginado } from "./cadProdService";



export function useFetchCadProd(page: number, limit=30){
    return useQuery<TypeCadProdResponse>({
        queryKey: ["produtos", page, limit],
        queryFn: () => fetchProdutosPaginado(page, limit),
    })
}