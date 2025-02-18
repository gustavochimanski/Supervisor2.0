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
    MonitorUpIcon
  } from "lucide-react";

import SubMenuEmpresas from "./submenu-empresas";
import { useEffect, useState } from "react";

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
        <Sidebar variant="sidebar"  collapsible="icon" className="dark">
            <SidebarHeader>
                <SubMenuEmpresas empresas={empresas} isSidebarOpen={open}/>
            </SidebarHeader>
            <SidebarSeparator className="bg-white"/>
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupLabel>Aplicações</SidebarGroupLabel>
                <SidebarGroupContent>
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
            </SidebarContent>
          </Sidebar>
    )
  }

  export default AppSidebar
  