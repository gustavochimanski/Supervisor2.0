// src/hooks/useMutateCategoria.ts
import apiMensura from "@/lib/api/apiMensura";
import { useMutation, useQueryClient } from "react-query"; // ou @tanstack/react-query

interface NovoBody {
  descricao: string;
  slug?: string;
  imagem?: File; // File nativo do browser
}

export function useMutateCategoria(parentSlug: string | null) {
  const qc = useQueryClient();

  function buildFormData({ descricao, slug, imagem }: NovoBody) {
    const fd = new FormData();
    fd.append("descricao", descricao.trim());
    if (slug) fd.append("slug", slug);
    fd.append("slug_pai", parentSlug ?? "");
    if (imagem) fd.append("imagem", imagem);
    return fd;
  }

  const createSub = useMutation(
    (body: NovoBody) =>
      apiMensura.post(
        "/mensura/categorias/delivery",
        buildFormData(body)
      ),
    {
      onSuccess: () => {
        // invalida a lista “plana”
        qc.invalidateQueries(["categorias_planas"]);
        // (opcional) invalida também a árvore, se estiver usando
        qc.invalidateQueries(["categorias"]);
      },
    }
  );

  const remove = useMutation(
    (id: number) =>
      apiMensura.delete(`/mensura/categorias/delivery/${id}`),
    {
      onSuccess: () => {
        qc.invalidateQueries(["categorias_planas"]);
        qc.invalidateQueries(["categorias"]);
      },
    }
  );

  return { createSub, remove };
}
