"use client"

import {
  Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchComponent } from "@/components/shared/searchComponent"
import { CircleCheck } from "lucide-react"
import { useFetchCadProdDelivery, useMutateProduto } from "../../services/useQueryProduto"
import { TypeCadProdDelivery } from "../../types/cadProdDeliveryType"
import { Input } from "@/components/ui/input"

import Image from "next/image"; // ← tem que ser ESSA exata

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

import { useCategorias } from "../../hooks/useCategorias"
import { Label } from "@/components/ui/label"
import { CategoryNode } from "../categorias/buildCategoryTree"
import { getImagemProxyUrl } from "@/utils/url"

// 🧠 Função para renderizar opções de categoria (recursiva)
function renderCategoryOption(cat: CategoryNode, prefix = ""): JSX.Element[] {
  const label = prefix + cat.label
  const item = (
    <SelectItem key={cat.id} value={String(cat.id)}>
      {label}
    </SelectItem>
  )
  const children = cat.children?.flatMap((child) =>
    renderCategoryOption(child, prefix + "— ")
  ) || []
  return [item, ...children]
}

// 🧩 Formulário extraído
function FormNovoProduto({ form, setForm, handleInputChange, handleFileChange, handleSubmit, categorias }: any) {
  return (
    <form onSubmit={handleSubmit} className="gap-3 md:grid grid-cols-2">
      <div>
        <Label htmlFor="cod_barras">Código de barras</Label>
        <Input type="text" name="cod_barras" value={form.cod_barras} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Input type="text" name="descricao" value={form.descricao} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="cod_categoria">Categoria</Label>
        <Select
          value={String(form.cod_categoria)}
          onValueChange={(val) => setForm((prev:any) => ({ ...prev, cod_categoria: parseInt(val) }))}
        >
          <SelectTrigger id="cod_categoria">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categorias?.map((cat:any) => renderCategoryOption(cat))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="preco_venda">Preço de venda</Label>
        <Input type="number" name="preco_venda" value={form.preco_venda} onChange={handleInputChange} required />
      </div>

      <div>
        <Label htmlFor="custo">Custo</Label>
        <Input type="number" name="custo" value={form.custo} onChange={handleInputChange} />
      </div>

      <div>
        <Label htmlFor="imagem">Imagem</Label>
        <Input type="file" name="imagem" accept="image/*" onChange={handleFileChange} />
      </div>

      <DialogFooter className="col-span-2 mt-4">
        <Button type="submit" className="w-full">
          Salvar Produto
        </Button>
      </DialogFooter>
    </form>
  )
}

// 🌟 Componente principal
const TabComponentProdutos = () => {
  const [showModalConfig, setShowModalConfig] = useState(false)
  const [pageProduto, setPageProduto] = useState<number>(1)
  const [loadCategorias, setLoadCategorias] = useState(false)

  const { data: dataProdutos } = useFetchCadProdDelivery(1, pageProduto, 30)
  const { data: categorias } = useCategorias()

  const [form, setForm] = useState({
    cod_barras: "",
    descricao: "",
    cod_categoria: 1,
    preco_venda: 0,
    custo: 0,
    imagem: undefined as File | undefined,
  })

  const { mutate } = useMutateProduto()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setForm({ ...form, [name]: type === "number" ? parseFloat(value) : value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setForm({ ...form, imagem: file })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("cod_barras", form.cod_barras)
    formData.append("descricao", form.descricao)
    formData.append("cod_categoria", String(form.cod_categoria))
    formData.append("preco_venda", String(form.preco_venda))
    formData.append("custo", String(form.custo))
    if (form.imagem) formData.append("imagem", form.imagem)

    mutate(formData, {
      onSuccess: () => {
        setShowModalConfig(false)
        setForm({ cod_barras: "", descricao: "", cod_categoria: 1, preco_venda: 0, custo: 0, imagem: undefined })
      }
    })

    setShowModalConfig(false)
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Cadastro de Produtos</CardTitle>
          <div>
            <SearchComponent className="w-full md:w-60" />
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
            {dataProdutos?.data.map((prod: TypeCadProdDelivery) => (
              <Card key={prod.cod_barras} className="shadow-sm border border-muted p-0 overflow-hidden flex flex-col">
                {prod.imagem ? (
                  <Image
                    src={getImagemProxyUrl(prod.imagem)}
                    alt={prod.descricao ?? "Imagem do produto"}
                    width={300} 
                    height={300} 
                    className="w-full h-40 object-cover"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="w-full h-40 bg-muted flex items-center justify-center text-sm text-muted-foreground">
                    Sem imagem
                  </div>
                )}

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div className="mb-2">
                    <h2 className="text-base font-semibold leading-tight">{prod.descricao}</h2>
                    <p className="text-xs text-muted-foreground">
                      {prod.cod_categoria} • {prod.label_categoria ?? "Sem categoria"}
                    </p>
                  </div>

                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p><strong>Barras:</strong> {prod.cod_barras}</p>
                    <p><strong>Custo:</strong> R$ {prod.custo?.toFixed(2)}</p>
                  </div>

                  <Button size="sm" variant="secondary" className="w-full mt-3" onClick={() => setShowModalConfig(true)}>
                    Editar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>

        <CardFooter className="gap-4">
          <Button onClick={() => {
            setShowModalConfig(true)
            setLoadCategorias(true)
          }}>
            <CircleCheck className="mr-2 h-4 w-4" />
            Incluir
          </Button>
        </CardFooter>
      </Card>

      {showModalConfig && (
        <Dialog open={showModalConfig} onOpenChange={setShowModalConfig}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
              <DialogDescription>Preencha os dados abaixo para adicionar um novo produto ao sistema.</DialogDescription>
            </DialogHeader>
            <FormNovoProduto
              form={form}
              setForm={setForm}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              categorias={categorias}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default TabComponentProdutos
