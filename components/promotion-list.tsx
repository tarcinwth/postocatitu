import { useEffect, useState } from "react"
import ValueCard from "@/components/value-card"
import { Award } from "lucide-react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gradient-to-br from-gray-100 via-gray-50 to-primary/5 rounded-2xl p-8 h-[220px] flex flex-col items-center shadow-lg">
      <div className="bg-gray-200 w-16 h-16 rounded-full mb-5" />
      <div className="h-6 w-32 bg-gray-200 rounded mb-3" />
      <div className="h-5 w-20 bg-gray-200 rounded" />
    </div>
  )
}

interface Promocao {
  id: string
  titulo: string
  descricao: string
  ativo: boolean
  dataInicio?: string
  dataFim?: string
}

export default function PromotionList() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPromocoes() {
      setLoading(true)
      try {
        // Busca todas as promoções e filtra as ativas no cliente
        // Isso é necessário porque o campo "ativo" pode não existir em promoções antigas
        const querySnapshot = await getDocs(collection(db, "promocoes"))
        const data: Promocao[] = []
        querySnapshot.forEach((doc) => {
          const promoData = doc.data()
          // Considera ativa se o campo ativo for true ou se não existir (compatibilidade)
          const isAtivo = promoData.ativo !== false
          if (isAtivo) {
            data.push({ 
              id: doc.id, 
              titulo: promoData.titulo,
              descricao: promoData.descricao,
              ativo: isAtivo,
              dataInicio: promoData.dataInicio,
              dataFim: promoData.dataFim
            } as Promocao)
          }
        })
        setPromocoes(data)
      } catch (e) {
        console.error('Erro ao carregar promoções:', e)
        setPromocoes([])
      }
      setLoading(false)
    }
    fetchPromocoes()
  }, [])

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="container">
          <div className="mb-6 text-center">
            <span className="inline-block px-4 py-1 mb-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              PROMOÇÕES ATIVAS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900">Aproveite nossas ofertas especiais!</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (promocoes.length === 0) {
    return null
  }

  return (
    <section className="py-8 bg-white">
      <div className="container">
        <div className="mb-6 text-center">
          <span className="inline-block px-4 py-1 mb-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            PROMOÇÕES ATIVAS
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900">Aproveite nossas ofertas especiais!</h2>
        </div>
        <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promocoes.map((promo, idx) => (
            <Dialog key={promo.id}>
              <DialogTrigger asChild>
                <div tabIndex={0} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer">
                  <div className="border-0 shadow-lg transition-all duration-300 h-full rounded-2xl bg-gradient-to-br from-white via-gray-50 to-primary/5 p-8 flex flex-col items-center hover:-translate-y-1 hover:shadow-xl">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-sm">
                          <Award className="h-8 w-8 text-primary" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">Promoção Especial</TooltipContent>
                    </Tooltip>
                    <h3 className="text-2xl font-extrabold mb-2 text-primary text-center drop-shadow-sm">{promo.titulo}</h3>
                    <div className="text-lg font-semibold text-gray-800 text-center mb-1" style={{wordBreak:'break-word'}}>
                      {promo.descricao.length > 60 ? promo.descricao.slice(0, 60) + '...' : promo.descricao}
                    </div>
                    {promo.dataInicio && promo.dataFim && (
                      <div className="text-xs text-gray-500 mt-2">Válida de {promo.dataInicio} até {promo.dataFim}</div>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="mt-4 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg" tabIndex={-1}>
                          Ver Detalhes
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Clique para ver detalhes completos da promoção</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <div className="flex items-center gap-4 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                  <DialogTitle>{promo.titulo}</DialogTitle>
                </div>
                <DialogDescription>
                  <p className="mb-2">{promo.descricao}</p>
                  {promo.dataInicio && promo.dataFim && (
                    <p className="text-sm text-gray-500">Válida de {promo.dataInicio} até {promo.dataFim}</p>
                  )}
                </DialogDescription>
                <div className="mt-6 flex justify-end">
                  <DialogClose asChild>
                    <Button variant="outline">Fechar</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        </TooltipProvider>
      </div>
    </section>
  )
} 