// services/auth.ts
import { signIn, signOut } from "next-auth/react";

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (
  username: string,
  password: string,
  callbackUrl: string = "/dashboard"
) => {
  const result = await signIn("credentials", {
    redirect: false,
    username,
    password,
    callbackUrl,
  });
  return result;
};

export const logout = () => {
  signOut({ callbackUrl: "/login" });
};
