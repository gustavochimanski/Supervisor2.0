// src/hooks/useMutateCategoria.ts
import apiMensura from "@/app/api/apiMensura";
import { useMutation, useQueryClient } from "react-query"; // ou @tanstack/react-query

interface NovoBody {
  descricao: string;
  slug?: string;
  imagem?: File; // File nativo do browser
}

export function useMutateCategoria(parentSlug: string | null) {
  const qc = useQueryClient();

  /** Constrói multipart/form-data */
  function buildFormData({ descricao, slug, imagem }: NovoBody) {
    const fd = new FormData();
    fd.append("descricao", descricao.trim());
    if (slug) fd.append("slug", slug);
    // ✅ envia "" se for null — backend deve tratar como None/null
    fd.append("slug_pai", parentSlug === null ? "" : parentSlug);
    if (imagem) fd.append("imagem", imagem);
    return fd;
  }

  const createSub = useMutation({
    mutationFn: (body: NovoBody) =>
      apiMensura.post(
        "/mensura/categorias/delivery",
        buildFormData(body) // 🚀 usa FormData, não seta Content-Type manual
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }),
  });

  const remove = useMutation({
    mutationFn: (id: number) =>
      apiMensura.delete(`/mensura/categorias/delivery${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }),
  });

  return { createSub, remove };
}
