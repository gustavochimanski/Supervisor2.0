// ClientLayout.tsx
"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar/app-sidebar"
import { QueryClientProvider } from "react-query"
import queryClient from "@/services/QueryClient"
import { useEffect, useState } from "react"
import TopBarComponent from "./topBar/app-topBar"

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
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={isSideBarOpen}>
        
        <AppSidebar />
        <main>
          <SidebarTrigger variant="secondary" />
          <div className="mt-16">
            {children}
          </div> 
        </main>
        <TopBarComponent></TopBarComponent>
      </SidebarProvider>
    </QueryClientProvider>
  )
}
