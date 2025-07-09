// src/services/Auth/authenticate.ts

import api from "@/lib/api/apiClient";


export type LoginResponse = {
  token_type: string;
  type_user: string;
  acess_token: string
};

export async function loginService(
  username: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/mensura/auth/token",        
    { username, password }
  );

  localStorage.setItem("access_token", data.acess_token);
  return data;
}
