"use client";

import ProtectedRoute from "@/components/security/ProtectedRoute";


const PageDashboard = () => {

    return(
        <ProtectedRoute>
            <div>   
                <h1>Dashboard</h1>
            </div>
        </ProtectedRoute>
    )
}

export default PageDashboard