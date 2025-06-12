"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormData {
  whatsappNumber: string; // só o número do WhatsApp do bot
}

const urlApi = "http//localhost:800/flow"

const TabComponentConfigChatBot = () => {
  const methods = useForm<FormData>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: FormData) => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/config-chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsappNumber: data.whatsappNumber,
        }),
      });

      if (res.ok) {
        setSuccess("Configurações salvas com sucesso!");
      } else {
        const body = await res.json();
        setError(body.message || "Erro ao salvar configurações.");
      }
    } catch {
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Configuração do Chatbot WhatsApp</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>Número do WhatsApp Bot</FormLabel>
            <FormControl>
              <Input
                {...methods.register("whatsappNumber", {
                  required: "Número do WhatsApp é obrigatório.",
                  pattern: {
                    value: /^\+\d{10,15}$/,
                    message:
                      "Número deve estar no formato internacional, ex: +5511999999999",
                  },
                })}
                placeholder="Digite o número no formato +5511999999999"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage>{errors.whatsappNumber?.message}</FormMessage>
          </FormItem>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </form>
      </FormProvider>

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
      {success && <p className="mt-4 text-green-600 font-medium">{success}</p>}
    </div>
  );
};

export default TabComponentConfigChatBot;
