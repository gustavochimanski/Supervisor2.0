"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PageVendas = () => {
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
            <h1>Página de vendas</h1>
        </div>
    )
}

export default PageVendas