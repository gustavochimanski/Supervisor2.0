"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/shared/sidebar/app-sidebar"
import { QueryClientProvider } from "react-query"
import queryClient from "@/services/Query/QueryClient"
import { useEffect, useState } from "react"
import TopBarComponent from "../shared/app-topBar"
import { Toaster } from "@/components/ui/toaster"
import ModalEnviarConfiguracao from "@/app/(private)/processos/components/comunicacao/ModalEnviarConfiguracoes"
import ModalEnviarProdutos from "@/app/(private)/processos/components/comunicacao/ModalEnviarProdutos"
import { ThemeProvider } from "next-themes"
import { useMediaQuery, useTheme } from "@mui/material"


interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean | null>(null)
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar:state="))
      ?.split("=")[1];

    setIsSidebarOpen(cookieValue === "true");
  }, [])

  if (isSideBarOpen === null) {
    return null // Evita o piscar da sidebar antes do estado ser definido
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider defaultOpen={isSideBarOpen}>
          <AppSidebar />
          <main className="flex h-screen w-full overflow-hidden">
            <SidebarTrigger variant="sidebarTrigger" />
            <div className="flex-1 flex flex-col overflow-hidden w-full">
              {!isMobile && (<TopBarComponent />)}
              <div className={`flex-1 overflow-auto w-full ${isMobile ? "p-0" : "p-4 pt-[3.5rem]"}`}>
                {children}
              </div>
            </div>
          </main>
          <Toaster />
          <ModalEnviarConfiguracao />
          <ModalEnviarProdutos />
        </SidebarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
