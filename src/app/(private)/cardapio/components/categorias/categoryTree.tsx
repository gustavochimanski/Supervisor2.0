"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { CategoryNode } from "./buildCategoryTree";
import { useMutateCategoria } from "../../hooks/useMutateCategoria";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSubcategoria from "./formSubCategoria";

export default function CategoryTree({ nodes }: { nodes: CategoryNode[] }) {
  // 1. Estado do diálogo de categoria raiz
  const [rootDialogOpen, setRootDialogOpen] = useState(false);

  return (
    <>
      {/* 2. Botão para nova categoria raiz */}
      <div className="flex justify-end mb-4">
        <Dialog open={rootDialogOpen} onOpenChange={setRootDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-1" /> Nova Categoria Raiz
            </Button>
          </DialogTrigger>
          <DialogContent>
            {/* 3. Reutiliza o mesmo form, sem parentSlug */}
            <FormSubcategoria
              parentSlug={null}
              onClose={() => setRootDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Árvore de categorias */}
      <ul className="space-y-1">
        {nodes.map((n) => (
          <Nodo key={n.id} node={n} />
        ))}
      </ul>
    </>
  );
}

function Nodo({ node }: { node: CategoryNode }) {
  const [open, setOpen] = useState(true);
  const [dialog, setDialog] = useState(false);
  const { remove } = useMutateCategoria(null);
  const im = `http://localhost:8000${node.imagem}`
  console.log(im)
  return (
    <li>
      <div className="flex items-center gap-1">
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

        {node.imagem && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={im}
            alt={node.label}
            className="w-5 h-5 rounded-full object-cover"
          />
        )}

        <span className="flex-1">{node.label}</span>

        {/* Botão + para subcategoria */}
        <Dialog open={dialog} onOpenChange={setDialog}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Plus size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <FormSubcategoria
              parentSlug={node.slug}
              onClose={() => setDialog(false)}
            />
          </DialogContent>
        </Dialog>

        <Button
          size="icon"
          variant="ghost"
          className="text-destructive"
          onClick={() => remove.mutate(node.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>

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
