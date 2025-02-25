// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Usuário" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const response = await axios.post("http://localhost:8080/auth/token", {
            username: credentials.username,
            password: credentials.password
          });
          
          const authData = response.data;
          if (authData?.token) {
            // Aguarda a resolução da Promise retornada por cookies()
            const cookieStore = await cookies();
            cookieStore.set({
              name: "token",
              value: authData.token,
              httpOnly: true, // Evita acesso via JS no browser
              path: "/",
              secure: process.env.NODE_ENV === "production"
            });

            return { 
              id: authData.id || 1, 
              name: authData.name || "Usuário", 
              email: credentials.username, 
              token: authData.token 
            };
          }
          return null;
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "development",
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login"
  },
  session: {
    strategy: "jwt"
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

  }
});

export { handler as GET, handler as POST };
