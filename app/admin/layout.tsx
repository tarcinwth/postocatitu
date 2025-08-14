"use client"

import Link from "next/link"
import { ReactNode, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Home, DollarSign, Tag, LogOut, Settings, BarChart3 } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Preços", href: "/admin/precos", icon: DollarSign },
  { label: "Promoções", href: "/admin/promocoes", icon: Tag },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [autenticado, setAutenticado] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAutenticado(!!user)
    })
    return () => unsub()
  }, [])

  // Fechar sidebar ao mudar de rota no mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Permitir que a rota de login renderize sem o gate local
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-red-600">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Você precisa estar autenticado para acessar o painel administrativo.</p>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={async () => {
              try { await fetch('/api/auth/session', { method: 'DELETE' }) } catch {}
              window.location.href = '/admin/login'
            }}
          >
            Fazer Login
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">Admin</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={async () => {
              try { await signOut(auth) } catch {}
              try { await fetch('/api/auth/session', { method: 'DELETE' }) } catch {}
              window.location.href = "/admin/login"
            }}
            aria-label="Sair"
            title="Sair"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header do Sidebar */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-gray-900">Painel Admin</h1>
                    <p className="text-sm text-gray-500">Posto Catitu</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navegação */}
              <nav className="flex-1 p-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                        isActive 
                          ? "bg-primary text-white shadow-lg" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Footer do Sidebar */}
              <div className="p-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="w-full justify-start space-x-3 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={async () => {
                    try { await signOut(auth) } catch {}
                    try { await fetch('/api/auth/session', { method: 'DELETE' }) } catch {}
                    window.location.href = "/admin/login"
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-80 bg-white shadow-xl border-r border-gray-200">
        <div className="flex flex-col w-full">
          {/* Header do Sidebar Desktop */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-2xl text-gray-900">Painel Admin</h1>
                <p className="text-sm text-gray-500">Posto Catitu</p>
              </div>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="flex-1 p-6 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-200 font-medium",
                    isActive 
                      ? "bg-primary text-white shadow-lg" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-lg">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer do Sidebar Desktop */}
          <div className="p-6 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full justify-start space-x-4 text-red-600 border-red-200 hover:bg-red-50 h-12 text-lg"
              onClick={async () => {
                try { await signOut(auth) } catch {}
                try { await fetch('/api/auth/session', { method: 'DELETE' }) } catch {}
                window.location.href = "/admin/login"
              }}
            >
              <LogOut className="h-6 w-6" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className={cn(
        "min-h-screen transition-all duration-300",
        "lg:ml-80", // Desktop: margem para o sidebar
        "pt-16 lg:pt-0" // Mobile: padding-top para o header
      )}>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 lg:p-10">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 