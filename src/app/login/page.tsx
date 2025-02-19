"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Ícones de olho
import "@/app/(site)/globals.css"
import styles from "./button.module.css"
import LogoImg from "../../../public/logo";
import CircularProgress from "@mui/material/CircularProgress";
import { login } from "@/services/AuthService";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow p-8">
        {/* Cabeçalho com ícone e título */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-14 h-14rounded mb-4">
          <LogoImg/>

          </div>
          <h1 className="text-2xl font-semibold">Unitec</h1>
        </div>

        {/* Formulário de login */}
        <form onSubmit={handleLogin}>
          <div className="relative mb-4">
            <input
              autoFocus
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              className=" p-4 w-full border-b-2 border-slate-200 focus:border-gray-50  border-transparent bg-[linear-gradient(to_right,_#2196F3,_#9C27B0)] bg-[length:0%_2px] 
              bg-no-repeat bg-bottom focus:bg-[length:100%_2px] transition-all duration-500 focus:outline-none outline-none"            />
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-3 w-full border-b-2  border-slate-200 focus:border-gray-50 border-transparent bg-[linear-gradient(to_right,_#2196F3,_#9C27B0)] bg-[length:0%_2px] 
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

          <div className="w-full h-16 flex justify-center">
            {isloading && (<CircularProgress/>)}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>

          <button type="submit" className={styles.button}>LOGIN</button>

        </form>

        {/* Link de Increver-se */}
        <div className="text-center mt-6">
          <p className="text-gray-500">Não tem uma conta? {" "}<a href="#" className="text-[#2196F3] hover:underline">Inscrever-se</a></p>
        </div>
        
      </div>
    </div>
  );
}
