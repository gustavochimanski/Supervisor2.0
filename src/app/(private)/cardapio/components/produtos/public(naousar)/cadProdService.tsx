
// ================================ CLIENT ==============================================

import apiMensura from "@/app/api/apiMensura";
import { TypeCadProd, TypeCadProdResponse } from "./cadProdTypes";

// ======================================================================================
export const fetchProdutosPaginado = async (page=1, limit=30): Promise<TypeCadProdResponse> => {
  const response = await apiMensura.get("/public/produtos", {
    params: { page, limit}
  });
  console.log(response.data)
  return response.data;
};