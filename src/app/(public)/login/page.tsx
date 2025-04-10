"use client"

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import LoaderComponent from "@/components/ui/loader";
import styles from "./button.module.css";
import { loginService } from "@/services/Auth/authenticate";
import "@/app/(private)/globals.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type FormValues = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
  
    if (errorParam === "CredentialsSignin") {
      // Aguarda o Toaster montar de fato
      requestAnimationFrame(() => {
        setTimeout(() => {
          toast.error("Usuário ou senha inválidos.");
          console.log("Toast disparado após montagem.");
        }, 50); // delay mínimo para garantir render
      });
    }
  }, []);
  
  const onSubmit = async (props: FormValues) => {
    setIsLoading(true);
    setErrorMessage("");

    await loginService(props.username, props.password); // redireciona automaticamente
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col md:justify-normal md:items-stretch absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] max-w-md p-6 bg-white rounded-lg shadow md:h-3/4">
        {/* Cabeçalho com ícone e título */}
        <div className="flex items-center justify-center w-1/4 my-10 rounded m-auto">
          <Image src={"/logoNome.jpg"} alt={"logo"} width={100} height={100} />
        </div>

        {/* Formulário de login */}
        <form
          noValidate
          className="flex flex-col md:mx-12 justify-between"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          <div className="w-full m-auto my-4">
            <input
              autoFocus
              type="text"
              placeholder="Usuário"
              {...register("username")}
              className="mt-4 mb-1 p-3 w-full border-b-2 border-slate-200 focus:border-gray-50 border-transparent bg-[linear-gradient(to_right,_#2196F3,_#9C27B0)] bg-[length:0%_2px] bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"
            />
          </div>

          <div className={`relative mb-4 mt-2 ${styles.hideDefaultPasswordIcons}`}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password")}
              className="mb-4 mt-1 p-3 w-full border-b-2 border-slate-200 focus:border-gray-50 border-transparent bg-[linear-gradient(to_right,_#2196F3,_#9C27B0)] bg-[length:0%_2px] bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"
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

          {isLoading && <LoaderComponent />}

          <div className="flex my-6 justify-center">
            <Button type="submit" disabled={isLoading} className={styles.button}>
              LOGIN
            </Button>
          </div>
        </form>

        {/* Link de Inscrever-se */}
        <div className="text-center mt-6">
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
