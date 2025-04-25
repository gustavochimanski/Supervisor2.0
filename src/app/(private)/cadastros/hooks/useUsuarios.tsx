import { useMutation, useQuery, useQueryClient } from "react-query"
import { TypeUsuario, TypeUsuariosResponse } from "../types/typesUsuarios"
import { fetchAllUsers, postNewUser } from "../services/usuariosService"

// ========== BUSCA TODOS OS USUÁRIOS ==========
// =============================================
export const useFetchAllUsers = () => {
    return useQuery<TypeUsuariosResponse>('fetchAllUsers', fetchAllUsers)
}


// ============ INCLUI NOVO USUÁRIO ============
// =============================================
export const usePostNewUser = () => {
    const queryClient = useQueryClient();

    return useMutation<TypeUsuario, Error, TypeUsuario>(
        (payload) => postNewUser(payload),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('fetchAllUsers');
            },
            onError: (error) => {
                console.error(`Erro ao Inserir Novo Usuário:`, error.message);
            },
        }
    )
    
}