"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageDashboard = () => {
    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        // Se não houver token, redirecione para a página de login
        router.push("/login");
    }
    }, [router]);

    // NÃO DEIXA A PÁGINA CARREGAR CASO NÃO TENHA O TOKEN
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    if (!isAuthChecked) {
    return <CircularProgress />; 
    }


    return(
        <div>   
            <h1>Dashboard</h1>
        </div>
    )
}

export default PageDashboard