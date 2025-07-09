"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import "@/app/(private)/globals.css";
import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@/services/Auth/useAuth";

type FormValues = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuth();  

  const onSubmit = async (form: FormValues) => {
    try {
      await login(form);  
    } catch {
      toast.error("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-2">
      <div className="flex flex-col justify-center w-[90%] max-w-md px-6 py-24 bg-background rounded-lg shadow">

        {/* Logo */}
        <div className="flex items-center justify-center w-1/4 mb-4 m-auto">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </div>

        {/* Formulário */}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <input
            autoFocus
            placeholder="Usuário"
            {...register("username")}
            className="mt-4 mb-1 p-3 w-full border-b-2 border-slate-200 focus:border-gray-50 bg-gradient-to-r from-blue-500 to-indigo-700 bg-[length:0%_2px] bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none"
            disabled={isLoggingIn}
          />

          <div className="relative my-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password")}
              className="w-full p-3 border-b-2 border-slate-200 focus:border-gray-50 bg-gradient-to-r from-blue-500 to-indigo-700 bg-[length:0%_2px] bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none"
              disabled={isLoggingIn}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword
                ? <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                : <EyeIcon className="h-5 w-5 text-gray-400" />}
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoggingIn} 
            className="w-full h-10 mt-4"
          >
            {isLoggingIn ? "Entrando..." : "LOGIN"}
          </Button>
        </form>

        {/* Inscrição */}
        <p className="mt-4 text-center text-gray-500">
          Não tem uma conta?{" "}
          <a href="#" className="text-blue-500 hover:underline">Inscrever-se</a>
        </p>
      </div>
    </div>
  );
}
