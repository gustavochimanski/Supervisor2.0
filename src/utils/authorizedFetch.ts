// utils/authorizedFetch.ts
import { auth } from "@/auth";

export const authorizedFetch = async (input: RequestInfo, init?: RequestInit) => {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Token JWT ausente");
  }

  const headers = {
    ...(init?.headers || {}),
    Authorization: `Bearer ${session.accessToken}`,
  };

  return fetch(input, {
    ...init,
    headers,
    cache: "no-store", // padrão no SSR
  });
};
