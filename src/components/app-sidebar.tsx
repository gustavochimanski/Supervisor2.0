"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  UserPlus,
  Home,
  BarChart,
  ShoppingCart,
  ShoppingBag,
  Package,
  DollarSign,
  Settings,
  Sliders,
  MonitorUp,
  CalendarCheck2

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavFavorites } from "@/components/nav-favorites"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { pages } from "next/dist/build/templates/app-page"

// This is sample data.
const data = {
  
  pages: [
    {
      name: "Home",
      url: "/home",
      icon: Home,
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: BarChart,
    },
  ],
  user: {
    name: "Gustavo Antunes",
    email: "gustavo@gtechtecnologia.com.br",
    avatar: "/avatars/logo.jpg",
  },
  teams: [
    {
      name: "Ponto Certo",
      logo: GalleryVerticalEnd,
      plan: "Campo Limpo - Loja 01",
    },
  ],
  navMain: [
    {
      title: "Vendas",
      url: "/vendas",
      icon: ShoppingCart,
      isActive: false,
      items: [
        {
          title: "Relação",
          url: "#",
        },
        {
          title: "Categoria",
          url: "#",
        },
        {
          title: "Produtos",
          url: "#",
        },
        {
          title: "Oferta",
          url: "#",
        }
      ],
    },{
      title: "Cadastros",
      url: "#",
      icon: UserPlus,
      isActive: false,
      items: [
        {
          title: "Produtos",
          url: "#",
        },
        {
          title: "Clientes",
          url: "#",
        },
        {
          title: "Fornecedores",
          url: "#",
        },
        {
          title: "Funcionários",
          url: "#",
        }
      ],
    },
    {
      title: "Compras",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "Ordem De Compra",
          url: "#",
        },
        {
          title: "Histórico",
          url: "#",
        },
        {
          title: "Fornecedores",
          url: "#",
        },
      ],
    },
    {
      title: "Estoque",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Inventário",
          url: "#",
        },
        {
          title: "Relatórios",
          url: "#",
        },
        {
          title: "Pereciveis",
          url: "#",
        }
      ],
    },{
      title: "Financeiro",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Constas a Pagar",
          url: "#",
        },
        {
          title: "Contas a Receber",
          url: "#",
        },
        {
          title: "Fluxo de Caixa",
          url: "#",
        },
        {
          title: "Relatórios",
          url: "#",
        }
      ],
    },
    {
      title: "Automação",
      url: "#",
      icon: Sliders,
      items: [
        {
          title: "Etiquetas",
          url: "#",
        },
        {
          title: "Balanças",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Frente Caixa",
      url: "#",
      icon: MonitorUp,
      items: [
        {
          title: "Perfil PDV",
          url: "#",
        },
        {
          title: "PDV",
          url: "#",
        },
        {
          title: "Teclados",
          url: "#",
        },
        {
          title: "Telas",
          url: "#",
        },
      ],
    },
    {
      title: "Calendario",
      url: "#",
      icon: CalendarCheck2,
      items: [
        {
          title: "Metas",
          url: "#",
        },
        {
          title: "PDV",
          url: "#",
        },
        {
          title: "Teclados",
          url: "#",
        },
        {
          title: "Telas",
          url: "#",
        },
      ],
    },
    {
      title: "Configuração",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites projects={data.pages} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
