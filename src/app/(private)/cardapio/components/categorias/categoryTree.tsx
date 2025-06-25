// components/CategoryTree.tsx

"use client"; // marca que é Client Component do Next.js

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { CategoryNode } from "./buildCategoryTree";       // Tipagem de cada nó
import { useMutateCategoria } from "../../hooks/useMutateCategoria";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSubcategoria from "./formSubCategoria";

/**
 * Componente que renderiza toda a árvore de categorias
 * @param nodes - array de CategoryNode já montada em árvore
 */
export default function CategoryTree({ nodes }: { nodes: CategoryNode[] }) {
  // Estado para controlar abertura do diálogo de criação de categoria raiz
  const [rootDialogOpen, setRootDialogOpen] = useState(false);

  return (
    <>
      {/* Botão para abrir o diálogo de criar nova categoria raiz */}
      <div className="flex justify-end mb-4">
        <Dialog open={rootDialogOpen} onOpenChange={setRootDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-1" /> Nova Categoria Raiz
            </Button>
          </DialogTrigger>
          <DialogContent>
            {/* Formulário de subcategoria sem parentSlug (gera raiz) */}
            <FormSubcategoria
              parentSlug={null}
              onClose={() => setRootDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Renderiza recursivamente cada nó como lista não ordenada */}
      <ul className="space-y-1">
        {nodes.map((n) => (
          <Nodo key={n.id} node={n} />
        ))}
      </ul>
    </>
  );
}

/**
 * Componente interno para renderizar um nó de categoria
 * @param node - objeto CategoryNode com filhos
 */
function Nodo({ node }: { node: CategoryNode }) {
  // Estado para abrir/fechar lista de filhos
  const [open, setOpen] = useState(true);
  // Estado para controlar diálogo de nova subcategoria
  const [dialog, setDialog] = useState(false);
  // Hook para remover categoria (usa node.id)
  const { remove } = useMutateCategoria(null);
  // Monta URL completa da imagem (exemplo local)
  if (!node.imagem) return <div></div>
  const im = `http://69.62.93.161:1001${node.imagem.replace('/minio/categorias/', '/categorias/')}`;
  console.log(im);


  return (
    <li>
      <div className="flex items-center gap-1">
        {/* Botão de expandir/colapsar filhos */}
        <Button
          size="icon"
          variant="ghost"
          className="p-0"
          onClick={() => setOpen((o) => !o)}
        >
          {node.children.length ? (
            open ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )
          ) : (
            <span className="w-4" />
          )}
        </Button>

        {/* Exibe avatar/imagem da categoria, se existir */}
        {node.imagem && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={im}
            alt={node.label}
            className="w-5 h-5 rounded-full object-cover"
          />
        )}

        {/* Texto do nome da categoria */}
        <span className="flex-1">{node.label}</span>

        {/* Botão para abrir diálogo de nova subcategoria */}
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Plus size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            {/* Passa slug atual como parentSlug */}
            <FormSubcategoria
              parentSlug={node.slug}
              onClose={() => setDialog(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Botão para remoção da categoria */}
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive"
          onClick={() => remove.mutate(node.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>

      {/* Se aberto e tiver filhos, renderiza lista aninhada */}
      {open && node.children.length > 0 && (
        <ul className="pl-5 border-l ml-[18px] mt-1">
          {node.children.map((c) => (
            <Nodo key={c.id} node={c} />
          ))}
        </ul>
      )}
    </li>
  );
}
