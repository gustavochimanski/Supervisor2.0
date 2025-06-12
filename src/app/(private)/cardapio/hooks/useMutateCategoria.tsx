// src/hooks/useMutateCategoria.ts
import apiMensura from "@/app/api/apiMensura";
import { useMutation, useQueryClient } from "react-query"; // ou @tanstack/react-query

interface NovoBody {
  nome: string;
  slug?: string;
  imagem?: File; // File nativo do browser
}

export function useMutateCategoria(parentSlug: string | null) {
  const qc = useQueryClient();

  /** Constrói multipart/form-data */
  function buildFormData({ nome, slug, imagem }: NovoBody) {
    const fd = new FormData();
    fd.append("nome", nome.trim());
    if (slug) fd.append("slug", slug);          // opcional
    if (parentSlug) fd.append("slug_pai", parentSlug);
    if (imagem) fd.append("imagem", imagem);    // só se tiver arquivo
    return fd;
  }

  const createSub = useMutation({
    mutationFn: (body: NovoBody) =>
      apiMensura.post(
        "/categorias/delivery/",
        buildFormData(body) // 🚀 agora é FormData
        // não defina Content-Type manualmente!
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }),
  });

  const remove = useMutation({
    mutationFn: (id: number) =>
      apiMensura.delete(`/categorias/delivery/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }),
  });

  return { createSub, remove };
}
