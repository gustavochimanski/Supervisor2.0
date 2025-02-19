import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react" // ou outro ícone de sua preferência

export function SearchComponent() {
  return (
    <div className="relative w-full my-4">
      <Input
        type="search"
        placeholder="Pesquisar..."
        className="pr-10" // espaço extra à direita para o ícone
      />
      <Button 
        variant="ghost"
        className="absolute inset-y-0 right-0 flex items-center p-2"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
