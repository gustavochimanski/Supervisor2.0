// layout.tsx
import { cookies } from "next/headers"
import ClientLayout from "@/components/ClientLayout"
import "./globals.css"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

      const router = useRouter();
  
      useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (!token) {
          // Se não houver token, redirecione para a página de login
          router.push("/login");
      }
      }, [router]);

  return (
    <html>
      <body>
        <ClientLayout defaultOpen={defaultOpen}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
