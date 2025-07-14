import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Droplet, ShoppingBag, Car, Gauge, Clock, Award } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  imageSrc: string
  hoverEffect?: boolean
}

export default function ServiceCard({ title, description, icon, imageSrc, hoverEffect = false }: ServiceCardProps) {
  return (
    <Card
      className={`overflow-hidden h-full border-0 shadow-lg ${hoverEffect ? "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" : ""}`}
    >
      <div className="relative h-48">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="p-6 relative">
        <div className="absolute -top-8 right-6 bg-primary text-white p-3 rounded-full shadow-lg">
          {icon === "fuel" && <Droplet className="h-6 w-6" />}
          {icon === "store" && <ShoppingBag className="h-6 w-6" />}
          {icon === "car-wash" && <Car className="h-6 w-6" />}
          {icon === "oil" && <Droplet className="h-6 w-6" />}
          {icon === "tire" && <Gauge className="h-6 w-6" />}
          {icon === "24h" && <Clock className="h-6 w-6" />}
          {icon === "badge" && <Award className="h-6 w-6" />}
        </div>
        <p className="text-gray-600 mt-4">{description}</p>
      </CardContent>
    </Card>
  )
}
