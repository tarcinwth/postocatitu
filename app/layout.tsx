import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const buttons = document.querySelectorAll('button:not([data-no-hover]), a.btn');
                buttons.forEach(button => {
                  button.addEventListener('mouseenter', () => {
                    button.classList.add('scale-[1.02]');
                  });
                  button.addEventListener('mouseleave', () => {
                    button.classList.remove('scale-[1.02]');
                  });
                });
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
