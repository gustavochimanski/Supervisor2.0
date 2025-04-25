//============= BUSCA TODOS OS USUARIOS ==============

import api from "@/app/api/api";
import { TypePerfilUsuario, TypeUsuario, TypeUsuariosResponse } from "../types/typesUsuarios";

//====================================================
export const fetchAllUsers = async (): Promise<TypeUsuariosResponse> => {
  const response = await api.get('config/usuario');
  return response.data;
};

export const postNewUser= async (payload: TypeUsuario): Promise<TypeUsuario> => {
  const response = await api.post('config/usuario', payload);
  return response.data
}
