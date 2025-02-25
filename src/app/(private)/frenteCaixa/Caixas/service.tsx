import api from "@/app/api/api"
import { TypeCaixas } from "./types"

export const fetchAllCaixas = async (): Promise<TypeCaixas[]> => {
    const response = await api.get('/v1/config/pdvs');
    return response.data;
}

export const fetchByIdCaixas = async (id: string): Promise<TypeCaixas> => {
    const response = await api.get(`/v1/config/pdvs/${id}`);
    return response.data;
}