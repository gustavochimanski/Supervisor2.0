"use client";

import { useState } from "react";
import { Apple, Tag, List } from "lucide-react";

import {
  Sheet,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CategoriaComponent from "./components/categorias/ComponentCategoria";
import ComponentProdutos from "./components/produtos/ComponentProdutosCardapio";

export default function PageCardapio() {
  const [openSheet, setOpenSheet] = useState<"produtos" | "promocoes" | "categorias" | null>(null);
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-4 flex flex-col gap-4">
        <h3 className="text-lg font-semibold mb-2">Menu</h3>

        <Button variant="ghost" className="justify-start"
          onClick={() => setOpenSheet("produtos")}>
          <Apple className="w-5 h-5 mr-2" /> Produtos
        </Button>

        <Button variant="ghost" className="justify-start"
          onClick={() => setOpenSheet("promocoes")}>
          <Tag className="w-5 h-5 mr-2" /> Promoções
        </Button>

        <Button variant="ghost" className="justify-start"
          onClick={() => setOpenSheet("categorias")}>
          <List className="w-5 h-5 mr-2" /> Categorias
        </Button>
      </aside>

      {/* Preview do cardápio */}
      <main className="flex-1 p-6 overflow-auto">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Preview do Cardápio</CardTitle>
            <CardDescription>Aqui você vê como ficará seu cardápio.</CardDescription>
          </CardHeader>

          <CardContent className="h-[calc(100vh-160px)] flex justify-center overflow-auto">
            <div className="flex flex-col w-[400px] h-full border rounded-xl overflow-hidden shadow-md bg-white">
              <div className="bg-gray-100 p-2 text-sm font-medium text-center">
                Preview do cardápio
              </div>
              <iframe
                src="https://cardapiosupermercado.vercel.app/"
                className="w-full flex-1"
              />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Sheet de Produtos */}
      <Sheet
        open={openSheet === "produtos"}
        onOpenChange={(open) => {
          // só fecha automaticamente se não estiver fixado
          if (!isFixed || open) setOpenSheet(open ? "produtos" : null);
        }}
        modal={!isFixed}       // <-- torna não-modal quando fixado
      >
        {/* overlay sempre renderiza, mas desabilita pointer-events quando fixado */}
        <SheetOverlay
          className={
            isFixed
              ? "fixed inset-0 bg-black/30 pointer-events-none z-40"
              : "fixed inset-0 bg-black/50 z-40"
          }
        />

        <SheetContent
          side="right"
          className="fixed top-0 right-0 h-screen w-[500px] bg-background z-50 overflow-auto"
        >
          <SheetHeader className="flex items-center justify-between p-4 border-b">
            <SheetTitle>Produtos</SheetTitle>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFixed((prev) => !prev)}
            >
              {isFixed ? "Desfixar" : "Fixar"}
            </Button>
          </SheetHeader>

          <ComponentProdutos />
        </SheetContent>
      </Sheet>

      <CategoriaComponent/>

    
    </div>
  );
}
