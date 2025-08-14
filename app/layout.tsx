import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Posto Catitu - Combustível de Qualidade com o Melhor Preço",
  description:
    "Abasteça seu veículo com a qualidade e economia que você merece no Posto Catitu. Oferecemos os melhores preços da região, loja de conveniência, lavagem expressa e muito mais.",
  keywords: "posto de gasolina, combustível, etanol, gasolina, diesel, lavagem, troca de óleo, conveniência, Catitu",
  icons: {
    icon: "/logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        {/* Toaster para notificações globais */}
        <Toaster />
      </body>
    </html>
  )
}
