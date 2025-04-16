import axios from 'axios';
import { TypeDashboardHeader, TypeFiltroRelatorio } from '../types/typeCardHeader';

export const postHeaderDashboard = async (payload: TypeFiltroRelatorio): Promise<TypeDashboardHeader> => {
  const response = await axios.post<TypeDashboardHeader>(
    "http://localhost:3001/vendas/periodo",
    payload
  );
  return response.data;
};