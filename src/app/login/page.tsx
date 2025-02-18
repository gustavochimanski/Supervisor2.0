"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("gustavo@gtech.com.br");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/token", {
        username,
        password,
      });

      const receivedToken = response.data.token;
      if (!receivedToken) {
        throw new Error("Token não encontrado na resposta");
      }

      localStorage.setItem("jwt", receivedToken);
      // Redireciona para a rota protegida (por exemplo, /dashboard)
      router.push("/dashboard");
    } catch (err: any) {
      setError("Falha ao fazer login");
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="username">Usuário:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Fazer Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
