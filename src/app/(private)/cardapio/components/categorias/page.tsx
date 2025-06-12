// src/app/admin/categorias/page.tsx
"use client";
import { useCategorias } from "../../hooks/useCategorias";
import CategoryTree from "./categoryTree";

export default function TabCategorias() {
  const { data = [], isLoading, error } = useCategorias();   // ② usa o hook no client

  if (isLoading) return <p>Carregando…</p>;
  if (error)     return <p>Erro ao carregar categorias</p>;

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>
      <CategoryTree nodes={data} />    {/* ③ passa array pronto */}
    </main>
  );
}
