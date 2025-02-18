"use client";
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Home = () => {
  // ==================================================
  // =================== ROTAS ========================
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      // Se não houver token, redirecione para a página de login
      router.push("/login");
    } else {
      // Se houver token, atualiza o estado para permitir renderizar a página
      setIsAuthChecked(true);
    }
  }, [router]);

  // Enquanto a verificação não for concluída, exibe um spinner de carregamento
  if (!isAuthChecked) {
    return <CircularProgress />;
  }

  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home;