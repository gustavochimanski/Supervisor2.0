// src/services/Auth/authenticate.ts

import api from "@/lib/api/apiClient";


export type LoginResponse = {
  token_type: string;
  type_user: string;
};

export async function loginService(
  username: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/mensura/auth/token",        
    { username, password }
  );
  return data;
}
