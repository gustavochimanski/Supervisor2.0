import api from "@/app/api/api"
import { TypeCaixas } from "../../app/(private)/frenteCaixa/Caixas/types"


export const fetchAllCaixas = async (): Promise<TypeCaixas[]> => {
    const response = await api.get('config/pdvs');
    return response.data;
}

export const fetchByIdCaixas = async (id: string): Promise<TypeCaixas> => {
    const response = await api.get(`config/pdvs/${id}`);
    return response.data;
}