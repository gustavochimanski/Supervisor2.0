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
        redirect: false,
      });
  
      if (result?.ok) {
        // ✅ força reload TOTAL para pegar nova sessão
        window.location.assign("/"); // <- FUNCIONA MESMO QUE TUDO QUEBRAR
      }
  
      return result;
    } catch (error) {
      console.error("Erro na autenticação");
    }
  };
  
  


  export const logout = async () => {
    const result = await signOut({
      redirect: false,
      callbackUrl: "/login",
    });
  
    if (result?.url) {
      window.location.href = result.url; // Agora sim, redireciona certo
    } else {
      window.location.href = "/login"; // fallback
    }
  };