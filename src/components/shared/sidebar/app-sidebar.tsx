"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import {
    Home,
    ShoppingCart,
    Package,
    DollarSign,
    Settings,
    ShoppingBag,
    MonitorUpIcon,
    Power,
    PieChart,
    CircleUser,
    Atom,
    Target,
  } from "lucide-react";

import { logout } from "@/services/Auth/authenticate";
import Image from 'next/image';
import Link from "next/link";


  // Menu items.
  const items = [
    { title: "Home", url: "/home", icon: Home },
    { title: "Dashboard", url: "/", icon: PieChart },
    { title: "Metas", url: "/metas", icon: Target },
    { title: "Vendas", url: "/vendas", icon: ShoppingCart },
    { title: "Cadastros", url: "/cadastros", icon: CircleUser },
    { title: "Processos", url: "/processos", icon: Atom },
    { title: "Compras", url: "/compras", icon: ShoppingBag },
    { title: "Estoque", url: "/estoque", icon: Package },
    { title: "Financeiro", url: "/financeiro", icon: DollarSign },
    { title: "Frente Caixa", url: "/frenteCaixa", icon: MonitorUpIcon },
    { title: "Configuração", url: "/configuracoes", icon: Settings },
  ];


  const AppSidebar = ()=> {

    
    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="justify-between">
                <SidebarGroup>
                <SidebarGroupLabel>Aplicações</SidebarGroupLabel>
                <SidebarGroupContent>
                  <Image src="/logo.png" alt="Logo" className="mb-3 m-auto" width={20} height={20}/>
                    <SidebarMenu >
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} >
                        <SidebarMenuButton asChild tooltip={item.title}>
                            <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
                
                {/*====== BUTTONS FOOTER SIDEBAR ====== */}
                <SidebarGroup>
                  <SidebarGroupLabel>Pessoal</SidebarGroupLabel>
                  <SidebarGroupContent>
                    {/* BUTTONS */}
                    <SidebarMenu>
                      <SidebarMenuItem >
                        <SidebarMenuButton onClick={logout} tooltip={"Sair"}>
                          <Power/>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

          </Sidebar>
    )
  }

  export default AppSidebar
  