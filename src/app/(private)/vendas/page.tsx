"use client";

import ProtectedRoute from "@/components/security/ProtectedRoute";

const PageVendas = () => {


    return(
        <ProtectedRoute>
            <div>   
                <h1>Página de vendas</h1>
            </div>
        </ProtectedRoute>
    )
}

export default PageVendas