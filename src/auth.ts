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
          const response = await axios.post("http://51.38.190.174:8087/auth/token", {
            username: credentials.username,
            password: credentials.password,
          });

          const authData = response.data;

          if (authData?.token) {
            return {
              name: authData.name || "Usuário",
              email: credentials.username,
              token: authData.token,
              expiresAt: Math.floor(Date.now() / 1000) + 60 * 60, // ⏳ 1 hora
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
        token.expiresAt = user.expiresAt;
      }

      const now = Math.floor(Date.now() / 1000);
      if (token.expiresAt && now > token.expiresAt) {
        console.log("🔒 Sessão expirada pelo tempo configurado (60m)");
        return {}; // limpa token, invalida sessão
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
