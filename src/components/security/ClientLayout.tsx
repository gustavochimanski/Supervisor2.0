// ClientLayout.tsx
"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/shared/sidebar/app-sidebar"
import { QueryClientProvider } from "react-query"
import queryClient from "@/services/Query/QueryClient"
import { useEffect, useState } from "react"
import TopBarComponent from "../shared/app-topBar"
import { Toaster } from "../ui/toaster"
import ModalEnviarConfiguracao from "@/app/(private)/processos/components/comunicacao/ModalEnviarConfiguracoes"
import ModalEnviarProdutos from "@/app/(private)/processos/components/comunicacao/ModalEnviarProdutos"
import { ThemeProvider } from "next-themes" 

interface ClientLayoutProps {
  children: React.ReactNode
  defaultOpen: boolean
}

export default function ClientLayout({ children, defaultOpen }: ClientLayoutProps) {
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean | null>(null)

  useEffect(() => {
    setIsSidebarOpen(defaultOpen)
  }, [defaultOpen])

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
            <TopBarComponent />
            <div className="flex-1 overflow-auto w-full p-4 pt-14">
              {children}
            </div>
          </div>
        </main>
        <Toaster />
        {/* =========================================== */}
        {/* ============== MODAIS GLOBAIS ============= */}
        <ModalEnviarConfiguracao />
        <ModalEnviarProdutos />
      </SidebarProvider>
    </QueryClientProvider>
    </ThemeProvider>
  )
}
