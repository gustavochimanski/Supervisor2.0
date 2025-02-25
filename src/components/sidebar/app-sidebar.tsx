"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
  } from "@/components/ui/sidebar"
  import {
    Home,
    ShoppingCart,
    UserPlus,
    Package,
    DollarSign,
    Sliders,
    Calendar,
    Settings,
    BarChart,
    ShoppingBag,
    MonitorUpIcon,
    Power,
  } from "lucide-react";

import { logout } from "@/services/auth";
import Image from 'next/image';


  // Menu items.
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Dashboard", url: "/dashboard", icon: BarChart },
    { title: "Vendas", url: "/vendas", icon: ShoppingCart },
    { title: "Cadastros", url: "#", icon: UserPlus },
    { title: "Compras", url: "#", icon: ShoppingBag },
    { title: "Estoque", url: "#", icon: Package },
    { title: "Financeiro", url: "#", icon: DollarSign },
    { title: "Automação", url: "#", icon: Sliders },
    { title: "Frente Caixa", url: "/frenteCaixa", icon: MonitorUpIcon },
    { title: "Calendário", url: "#", icon: Calendar },
    { title: "Configuração", url: "#", icon: Settings },
  ];

  const empresas = [
    { nome_empresa: "Ponto Certo - Campo Limpo" },
    { nome_empresa: "Ponto Certo - Novo Líder" },
    { nome_empresa: "Ponto Certo - Embu" },
  ];

  
  const AppSidebar = ()=> {

  const { open } = useSidebar();
    
    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="justify-between">
                <SidebarGroup>
                <SidebarGroupLabel>Aplicações</SidebarGroupLabel>
                <SidebarGroupContent>
                  <Image src="../../../logo.jpg" alt="Logo" className="h-5 mb-3 m-auto "/>
                    <SidebarMenu >
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} >
                        <SidebarMenuButton asChild tooltip={item.title}>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
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
  