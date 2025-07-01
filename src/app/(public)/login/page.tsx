"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

import "@/app/(private)/globals.css";
import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@/services/Auth/useAuth"; // ✅ hook com React Query
import { useRouter } from "next/navigation";

type FormValues = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuth();
  const router = useRouter();

  const onSubmit = async (form: FormValues) => {
    try {
      await login(form);
      router.replace("/");  
    } catch {
      toast.error("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-2">
      <div className="flex flex-col justify-center w-[90%] max-w-md px-6 py-24 bg-background rounded-lg shadow">

        {/* Cabeçalho com ícone e título */}
        <div className="flex items-center justify-center w-1/4 mb-4 rounded m-auto ">
          <Image src={"/logo.png"} alt={"logo"} width={50} height={50} />
        </div>

        {/* Formulário de login */}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="w-full m-auto my-2">
            <input
              autoFocus
              type="text"
              placeholder="Usuário"
              {...register("username")}
              className="mt-4 mb-1 p-3 w-full border-b-2 border-slate-200 focus:border-gray-50 border-transparent bg-[linear-gradient(to_right,_#2196F3,_#4338ca)] bg-[length:0%_2px] bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"
            />
          </div>

          <div className="relative my-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password")}
              className="mb-4 mt-1 p-3 w-full border-b-2 border-slate-200 focus:border-gray-50 border-transparent bg-[linear-gradient(to_right,_#2196F3,_#4338ca)] bg-[length:0%_2px] bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>

          <div className="flex mt-4 mb-4 justify-center">
            <Button type="submit" disabled={isLoggingIn} className="w-full h-10">
              {isLoggingIn ? "Entrando..." : "LOGIN"}
            </Button>
          </div>
        </form>

        {/* Link de Inscrever-se */}
        <div className="text-center ">
          <p className="text-gray-500">
            Não tem uma conta?{" "}
            <a href="#" className="text-[#2196F3] hover:underline">
              Inscrever-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
