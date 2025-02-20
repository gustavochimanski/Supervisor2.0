"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Ícones de olho
import "@/app/(private)/globals.css"
import styles from "./button.module.css"
import LogoImg from "../../../../public/logo";
import { login } from "@/services/AuthService";
import LoaderComponent from "@/components/ui/loader";
import { Button } from "@/components/ui/button";

export default function LoginFormComponent() {
  const router = useRouter();
  const [username, setUsername] = useState("gustavo@gtech.com.br");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false); // Controla exibir/ocultar senha
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true)
    try {
      await login({ username, password });
      router.push("/dashboard"); // Redireciona para a página após login
    } catch (error) {
      setError("Credenciais inválidas!"); // Mostra o erro na tela
    }
    setIsLoading(false)
  }

  return (

    <div className="justify-center w-full h-full">
      <div className=" flex flex-col justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] max-w-md p-6 bg-white rounded-lg shadow md:h-3/4">
        {/* Cabeçalho com ícone e título */}
        <div className="flex flex-col items-center my-6">
          <div className="flex items-center justify-center w-14 h-14rounded mb-4">
          <LogoImg/>
          </div>
          <h1 className="text-2xl font-semibold">Unitec</h1>
        </div>
        

        {/* Formulário de login */}
        <form onSubmit={handleLogin}>
          <div className="flex justify-center items-center mb-4">
            <input
              autoFocus
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              className="my-6 p-4 w-full border-b-2 border-slate-200 focus:border-gray-50  border-transparent bg-[linear-gradient(to_right,_#2196F3,_#9C27B0)] bg-[length:0%_2px] 
              bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"            />
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="my-6 p-3 w-full border-b-2  border-slate-200 focus:border-gray-50 border-transparent bg-[linear-gradient(to_right,_#2196F3,_#9C27B0)] bg-[length:0%_2px] 
              bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"             />
            {/* Ícone para exibir/ocultar senha */}
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

          <div className="">
            {isloading && (<LoaderComponent/>)}
            {error && <p className="text-rose-600 text-center my-4">{error}</p>}
          </div>

          <div className="flex justify-center">
            <Button type="submit" disabled={isloading} className={styles.button}>
              LOGIN
            </Button>
          </div>


        </form>

        {/* Link de Increver-se */}
        <div className="text-center mt-6">
          <p className="text-gray-500">Não tem uma conta? {" "}<a href="#" className="text-[#2196F3] hover:underline">Inscrever-se</a></p>
        </div>
        
      </div>
    </div>
  );
}
