// layout.tsx
import { cookies } from "next/headers"
import ClientLayout from "@/components/ClientLayout"
import "./globals.css"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

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
