import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (!token) {
      // Se não houver token, redirecione para a página de login
      router.push("/login");
  }
  }, [router]);
  
  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home;