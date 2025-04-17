import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import qs from "qs"; // Importa a biblioteca qs

export const { auth, handlers } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const response = await axios.post("http://51.38.190.174:8087/auth/token", qs.stringify({
            username: credentials.username,
            password: credentials.password,
          }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Define o tipo de conteúdo
            },
          });

          const authData = response.data;

          if (authData?.token) {
            return {
              name: authData.name || "Usuário",
              email: credentials.username,
              token: authData.token,
              expiresAt: Math.floor(Date.now() / 1000) + 60 * 25, // 25 min
            } as any;
          }

          return null;
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      if (user) {
        token.accessToken = user.token;
        token.exp = now + 60 * 25; // define exp direto
      }

      if (token.exp && now > token.exp) {
        console.log("🔒 Sessão expirada — token removido");
        return {}; // ou { exp: 0 } se quiser manter o formato
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
});