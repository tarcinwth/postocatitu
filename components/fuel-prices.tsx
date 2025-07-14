import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FuelPrice {
  type: string
  price: string
  icon: string
  color: string
  badge?: string
}

export default function FuelPrices() {
  const fuelPrices: FuelPrice[] = [
    {
      type: "Gasolina Comum",
      price: "R$ 5,49",
      icon: "gas-pump",
      color: "bg-red-100 text-primary",
      badge: "Mais vendido",
    },
    {
      type: "Gasolina Aditivada",
      price: "R$ 5,79",
      icon: "gas-pump-premium",
      color: "bg-gray-100 text-secondary",
    },
    {
      type: "Etanol",
      price: "R$ 3,89",
      icon: "droplet",
      color: "bg-accent text-primary",
      badge: "Promoção",
    },
    {
      type: "Diesel S10",
      price: "R$ 6,29",
      icon: "truck",
      color: "bg-gray-100 text-secondary",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {fuelPrices.map((fuel, index) => (
        <Card key={index} className="overflow-hidden border-2 hover:border-primary transition-all duration-300">
          <CardContent className="p-6">
            <div className={`w-12 h-12 rounded-full ${fuel.color} flex items-center justify-center mb-4`}>
              {fuel.icon === "gas-pump" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M4 20V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
                  <path d="M14 20h-8" />
                  <path d="M14 4h2a2 2 0 0 1 2 2v4" />
                  <path d="M18 16V8a2 2 0 0 1 2-2h2" />
                  <path d="M22 12v4" />
                </svg>
              )}
              {fuel.icon === "gas-pump-premium" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M4 20V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
                  <path d="M14 20h-8" />
                  <path d="M14 4h2a2 2 0 0 1 2 2v4" />
                  <path d="M18 16V8a2 2 0 0 1 2-2h2" />
                  <path d="M22 12v4" />
                  <path d="M9 12v4" />
                  <path d="M7 12h4" />
                </svg>
              )}
              {fuel.icon === "droplet" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                </svg>
              )}
              {fuel.icon === "truck" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M10 17h4V5H2v12h3" />
                  <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
                  <circle cx="7.5" cy="17.5" r="2.5" />
                  <circle cx="17.5" cy="17.5" r="2.5" />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-bold">{fuel.type}</h3>
            <p className="text-2xl font-bold text-primary mt-2">{fuel.price}</p>
            {fuel.badge && (
              <Badge className="mt-3" variant="outline">
                {fuel.badge}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
