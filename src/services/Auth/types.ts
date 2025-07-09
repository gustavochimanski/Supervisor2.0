// src/services/types.ts

/** Representa um usuário */
export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

/** Resposta da autenticação (login / refresh) */
export interface AuthResponse {
  token: string;
  refresh_token: string;
}
