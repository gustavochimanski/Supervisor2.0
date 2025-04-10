  // services/auth.ts
  import { signIn, signOut } from "next-auth/react";

  export interface LoginData {
    username: string;
    password: string;
  }

  export const loginService = async (
    username: string,
    password: string,
  ) => {
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: true,
      });

      return result;
    } catch (error) {
      console.error("Erro na autenticação");
    }
  };

  export const logout = () => {
    signOut({redirect: true});
  };
