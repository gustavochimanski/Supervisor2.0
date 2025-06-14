// src/app/admin/categorias/page.tsx

"use client";

import { useCategorias } from "../../hooks/useCategorias";
import CategoryTree from "./categoryTree";

/**
 * Componente de página que renderiza a aba de Categorias.
 * Faz a requisição e exibe estados de loading/erro.
 */
export default function TabCategorias() {
  // Hook que busca a lista de CategoryNode do backend
  const { data = [], isLoading, error } = useCategorias();

  if (isLoading) return <p>Carregando…</p>;
  if (error) return <p>Erro ao carregar categorias</p>;

  // Renderiza título e árvore de categorias
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>
      <CategoryTree nodes={data} />
    </main>
  );
}
