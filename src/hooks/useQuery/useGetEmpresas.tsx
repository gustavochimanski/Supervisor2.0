// src/hooks/useEmpresas.ts
"use client";

import { getEmpresas } from "@/services/global/serviceGetEmpresas";
import { useQuery } from "react-query";

export function useGetEmpresas() {
  return useQuery({
    queryKey: ["empresas"],
    queryFn: getEmpresas,
    staleTime: 1000 * 60 * 5, // cache por 5 min
  });
}
