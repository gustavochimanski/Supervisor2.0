// src/services/types.ts

/** Representa um usuário */
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  // adicione aqui outros campos que sua API retorne, ex:
  // telefone?: string;
  // criadoEm: string;
}

/** Resposta paginada de usuários */
export interface TypeUsuariosResponse {
  data: Usuario[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

/** Resposta da autenticação (login / refresh) */
export interface AuthResponse {
  token: string;
  refresh_token: string;
  // caso haja mais dados no login, por exemplo expiração ou roles:
  // expires_in: number;
  // roles: string[];
}
