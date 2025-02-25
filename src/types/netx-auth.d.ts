// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      token?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends DefaultUser {
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    accessToken?: string;
  }
}
