import { useEffect, useState } from "react"
import ValueCard from "@/components/value-card"
import { Fuel, Droplet, Truck, Award } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gradient-to-br from-gray-100 via-gray-50 to-primary/5 rounded-2xl p-8 h-[220px] flex flex-col items-center shadow-lg">
      <div className="bg-gray-200 w-16 h-16 rounded-full mb-5" />
      <div className="h-6 w-32 bg-gray-200 rounded mb-3" />
      <div className="h-5 w-20 bg-gray-200 rounded" />
    </div>
  )
}

interface FuelPrice {
  id: string
  tipo: string
  valor: number
  badge?: string
}

const iconMap: Record<string, any> = {
  "Gasolina Comum": Fuel,
  "Gasolina Aditivada": Award,
  "Etanol": Droplet,
  "Diesel S10": Truck,
  "Diesel S500": Truck,
}

export default function FuelPrices() {
  const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true)
      try {
        const querySnapshot = await getDocs(collection(db, "precos"))
        const data: FuelPrice[] = []
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as FuelPrice)
        })
        setFuelPrices(data)
      } catch (e) {
        setFuelPrices([])
      }
      setLoading(false)
    }
    fetchPrices()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    )
  }

  if (fuelPrices.length === 0) {
    return <div className="text-center py-8 text-gray-500">Nenhum preço cadastrado.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {fuelPrices.map((fuel, idx) => (
        <ValueCard
          key={fuel.id}
          icon={iconMap[fuel.tipo] || Fuel}
          title={fuel.tipo}
          description={<span className="text-2xl font-bold text-primary">R$ {fuel.valor?.toFixed(2)}</span>}
          delay={0.1 * idx}
        />
      ))}
    </div>
  )
}
