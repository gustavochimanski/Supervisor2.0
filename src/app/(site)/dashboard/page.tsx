"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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