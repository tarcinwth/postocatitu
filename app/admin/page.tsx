"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
// Migrado para API interna sem Firebase
import { 
  Tag, 
  DollarSign, 
  CalendarCheck, 
  Users, 
  TrendingUp, 
  Activity,
  Plus,
  ArrowRight,
  RefreshCw
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    precos: 0,
    promocoes: 0,
    promocoesAtivas: 0,
    ultimaAtualizacao: "-",
    admins: 2 // mock
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    setLoading(true)
    try {
      const precosSnap = await getDocs(collection(db, "precos"))
      const promocoesSnap = await getDocs(collection(db, "promocoes"))
      const precos = precosSnap.docs
      const promocoes = promocoesSnap.docs
      
      // Conta promoções ativas
      const promocoesAtivas = promocoes.filter((doc: any) => {
        const data = doc.data()
        return data.ativo !== false // Padrão é true se não existir
      }).length
      
      // Tenta pegar o campo updatedAt se existir
      let ultima = "-"
      const datas = precos
        .map((doc: any) => doc.data().updatedAt || doc.data().createdAt)
        .filter(Boolean)
        .map((date: any) => {
          if (typeof date === "string") return new Date(date)
          if (date?.toDate) return date.toDate()
          return null
        })
        .filter(Boolean) as Date[]
      if (datas.length > 0) {
        const maisRecente = datas.reduce((a: Date, b: Date) => (a > b ? a : b))
        ultima = maisRecente.toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      setStats({
        precos: precos.length,
        promocoes: promocoes.length,
        promocoesAtivas: promocoesAtivas,
        ultimaAtualizacao: ultima,
        admins: 2 // mock
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
    setLoading(false)
  }

  async function handleRefresh() {
    setRefreshing(true)
    await fetchStats()
    setRefreshing(false)
  }

  const statCards = [
    {
      title: "Preços Cadastrados",
      value: stats.precos,
      icon: DollarSign,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      href: "/admin/precos"
    },
    {
      title: "Promoções Ativas",
      value: stats.promocoesAtivas,
      icon: Tag,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      href: "/admin/promocoes"
    },
    {
      title: "Última Atualização",
      value: stats.ultimaAtualizacao,
      icon: CalendarCheck,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      isDate: true
    },
    {
      title: "Administradores",
      value: stats.admins,
      icon: Users,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    }
  ]

  const quickActions = [
    {
      title: "Adicionar Preço",
      description: "Cadastrar novo preço de combustível",
      icon: Plus,
      href: "/admin/precos",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Nova Promoção",
      description: "Criar nova promoção",
      icon: Tag,
      href: "/admin/promocoes",
      color: "bg-blue-500 hover:bg-blue-600"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Gerencie preços, promoções e acompanhe as estatísticas do posto
          </p>
        </div>
        <Button 
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Atualizando...' : 'Atualizar'}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando informações...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${card.bgColor}`}>
                        <Icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
                      </div>
                      {card.href && (
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      )}
                    </div>
                    <CardTitle className="text-sm font-medium text-gray-600 mb-2">
                      {card.title}
                    </CardTitle>
                    <div className={`text-2xl font-bold ${card.textColor}`}>
                      {card.isDate ? card.value : card.value.toLocaleString('pt-BR')}
                    </div>
                    {card.href && (
                      <Link href={card.href} className="block mt-4">
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-sm text-gray-500 hover:text-gray-700">
                          Ver detalhes
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Ações Rápidas */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link key={index} href={action.href}>
                      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${action.color} text-white`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                {action.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {action.description}
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Informações do Sistema */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Bem-vindo ao Painel Administrativo!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Aqui você pode visualizar estatísticas rápidas do posto, gerenciar preços e promoções, 
                    e acompanhar as principais informações do sistema em tempo real.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Dados atualizados automaticamente</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Interface responsiva</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">Navegação intuitiva</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
} 