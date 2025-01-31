// ClientLayout.tsx
"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar/app-sidebar"
import { QueryClientProvider } from "react-query"
import { queryClient } from "@/services/queryClient"

interface ClientLayoutProps {
  children: React.ReactNode
  defaultOpen: boolean
}

export default function ClientLayout({ children, defaultOpen }: ClientLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main>
          <SidebarTrigger variant="secondary" />
          {children}
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  )
}
