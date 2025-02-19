// src/components/ProtectedRoute.tsx
"use client";

import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

import LoaderComponent from "./ui/loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthChecked, isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthChecked, isAuthenticated, router]);

  if (!isAuthChecked || (isAuthChecked && !isAuthenticated)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderComponent />
      </div>
    );
  }

  return <>{children}</>;
}
