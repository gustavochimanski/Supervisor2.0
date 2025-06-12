"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useMutateCategoria } from "../../hooks/useMutateCategoria";

const schema = z.object({
  nome: z.string().min(2),
  slug: z.string().optional(),
  imagem: z
    .instanceof(File)
    .optional()
    .refine((f) => !f || f.size <= 2 * 1024 * 1024, "Máx. 2 MB"),
});
type FormData = z.infer<typeof schema>;

interface Props {
  parentSlug: string | null;
  onClose: () => void;
}

export default function FormSubcategoria({ parentSlug, onClose }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", slug: "" },
  });

  const { createSub } = useMutateCategoria(parentSlug);

  /* preview da imagem */
  const file = form.watch("imagem");
  const [preview, setPreview] = useState<string | null>(null);
  if (file instanceof File && !preview) {
    setPreview(URL.createObjectURL(file));
  }



  async function onSubmit(data: FormData) {
    await createSub.mutateAsync({
      nome: data.nome.trim(),
      slug: data.slug || slugify(data.nome, { lower: true }),
      imagem: data.imagem,
    });
    form.reset();
    onClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
        encType="multipart/form-data"
      >
        {/* NOME */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <Label>Nome</Label>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* IMAGEM */}
        <FormField
          control={form.control}
          name="imagem"
          render={({ field }) => (
            <FormItem>
              <Label>Imagem</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const arquivo = e.target.files?.[0];
                  field.onChange(arquivo);
                  if (arquivo) setPreview(URL.createObjectURL(arquivo));
                }}
              />
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 mt-2 object-cover rounded"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BOTÕES */}
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Salvando…" : "Salvar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
