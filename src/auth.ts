import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
          // Envia a requisição com os dados no formato desejado
          const response = await axios.post("http://51.38.190.174:8087/auth/token", {
            username: credentials.username,
            password: credentials.password,
          });

          const authData = response.data;

          if (authData?.token) {
            // Retorna o objeto usuário com o token recebido
            return {
              name: authData.name || "Usuário",
              email: credentials.username,
              token: authData.token,
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
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    authorized: async ({ auth }) => !!auth,
  },
});
