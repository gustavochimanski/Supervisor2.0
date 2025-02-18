"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PageDashboard = () => {
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
            <h1>Dashboard</h1>
        </div>
    )
}

export default PageDashboard