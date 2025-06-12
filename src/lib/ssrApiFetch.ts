// lib/ssrApiFetch.ts
import { getApiSSR } from "@/app/api/apiSSR";
import { redirect } from "next/navigation";

export async function ssrApiFetch<T = any>(fn: (api: Awaited<ReturnType<typeof getApiSSR>>) => Promise<T>) {
  const api = await getApiSSR();

  try {
    return await fn(api);
  } catch (error: any) {
    // Trata 401 automaticamente!
    if (error.response?.status === 401) {
      redirect("/login");
    }
    // Você pode customizar para outros códigos aqui
    throw error; // Outros erros sobem normalmente
  }
}
