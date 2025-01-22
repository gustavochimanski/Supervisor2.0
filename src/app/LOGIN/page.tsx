"use client"; // Se estiver usando Next.js App Router

import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  // Armazenar o token de autenticação após o login
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:8080/auth/token", {
        username: "gustavo@gtech.com.br",
        password: "123456",
      });

      const receivedToken = response.data.token;
      if (!receivedToken) {
        throw new Error("Token não encontrado na resposta");
      }

      // Salva token em estado e localStorage
      setToken(receivedToken);
      localStorage.setItem("jwt", receivedToken);
    } catch (err: any) {
      setError("Falha ao fazer login");
      console.error(err);
    }
  }

  // Exemplo de requisição protegida
  async function handleGetProtected() {
    try {
      const storedToken = localStorage.getItem("jwt"); 
      if (!storedToken) {
        alert("Nenhum token encontrado. Faça login antes!");
        return;
      }

      // Envia GET para rota protegida, incluindo o cabeçalho Authorization
      const response = await axios.get("http://localhost:8080/auth/protected", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      // Exibe a resposta do servidor protegido
      alert("Resposta da rota protegida: " + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      alert("Erro ao acessar rota protegida!");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Exemplo de Login + Rota Protegida</h1>
      {!token ? (
        <>
          <p>
            Testando login com: <br />
            <strong>username:</strong> gustavo@gtech.com.br<br />
            <strong>password:</strong> 123456
          </p>
          <button onClick={handleLogin}>Fazer Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      ) : (
        <>
          <p style={{ color: "green" }}>Login bem-sucedido!</p>
          <p>Token: {token}</p>
          
          {/* Botão que faz uma chamada a rota protegida */}
          <button onClick={handleGetProtected}>
            Chamar Rota Protegida
          </button>
        </>
      )}
    </div>
  );
}
