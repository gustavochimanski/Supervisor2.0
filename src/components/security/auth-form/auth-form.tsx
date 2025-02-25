"use client"
// /src/components/security/auth-form.tsx

import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../ui/button";
import LoaderComponent from "../../ui/loader";
import LogoImg from "../../../../public/logo";
import styles from "./button.module.css";

type FormValues = {
  username: string;
  password: string;
};


export function AuthForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    setErrorMessage("");
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
    });

    setIsLoading(false);

    if (result?.error) {
      setErrorMessage("Credenciais inválidas ou erro na autenticação.");
    } else {
      console.log("Usuário autenticado com sucesso!");
      // Realize redirecionamento ou outra ação, se necessário.
    }
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col md:justify-normal md:items-stretch absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] max-w-md p-6 bg-white rounded-lg shadow md:h-3/4">
        {/* Cabeçalho com ícone e título */}
        <div className="flex items-center justify-center w-1/4 my-10 rounded m-auto">
          <LogoImg />
        </div>

        {/* Formulário de login */}
        <form noValidate className="flex flex-col md:mx-12 justify-between" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full m-auto my-4">
            <input
              autoFocus
              type="email"
              placeholder="Email"
              {...register('username')}
              className="mt-4 mb-1 p-3 w-full border-b-2 border-slate-200 focus:border-gray-50 border-transparent bg-[linear-gradient(to_right,_#2196F3,_#9C27B0)] bg-[length:0%_2px] bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"
            />
          </div>

          <div className={`relative mb-4 mt-2 ${styles.hideDefaultPasswordIcons}`}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register('password')}
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

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <div className="flex my-6 justify-center">
            <Button type="submit" disabled={isLoading} className={styles.button}>
              LOGIN
            </Button>
          </div>
        </form>

        {/* Link de Increver-se */}
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
