"use client";

import { CategoriaCard } from "./CategoriaCard";
import { BotaoNovaCategoria } from "./BotaoNovaCateg";
import { useCategorias } from "../../hooks/useCategorias";

export default function PageCategorias() {
  const { data = [], isLoading } = useCategorias();

  if (isLoading) return <p>Carregando...</p>;

  const raiz = data.filter((cat) => !cat.slug_pai);
  const filhosPorPai = (slugPai: string) =>
    data.filter((cat) => cat.slug_pai === slugPai);

  return (
    <main className="p-6 min-h-screen flex gap-6">
      {/* Coluna da administração */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categorias</h1>
          <BotaoNovaCategoria />
        </div>

        <div className="rounded-xl border shadow-md bg-white p-6 w-full overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {raiz.map((cat) => (
              <div
                key={cat.slug}
                className="rounded-lg border p-4 shadow-sm bg-gray-50"
              >
                <CategoriaCard
                  categoria={cat}
                  subcategorias={filhosPorPai(cat.slug)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coluna do preview */}
      <div className="w-[400px] border rounded-xl overflow-hidden shadow-md bg-white">
        <div className="bg-gray-100 p-2 text-sm font-medium text-center">
          Preview do cardápio
        </div>
        <iframe
          src="https://cardapiosupermercado.vercel.app/" // troca pela URL real do seu front de delivery
          className="w-full h-[88%]"
        />
      </div>
    </main>
  );
}
