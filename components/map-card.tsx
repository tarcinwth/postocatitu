"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Card } from "@/components/ui/card"

export default function MapCard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<"map" | "satellite">("map")

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getMapUrl = () => {
    // Para satélite, usamos o parâmetro "5e1" (vista de satélite)
    // Para mapa normal, usamos o parâmetro "5e0" (vista de mapa)
    const mapType = activeTab === "satellite" ? "1" : "0"

    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.160399496156!2d-39.588833924922405!3d-13.035914387285375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x73fdd27ae190459%3A0x245ccc47bbfe0d31!2sPosto%20Catit%C3%BA!5e${mapType}!3m2!1spt-BR!2sbr!4v1743109283715!5m2!1spt-BR!2sbr`
  }

  useEffect(() => {
    // Recarregar o iframe quando o usuário mudar entre mapa e satélite
    setIsLoaded(false)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [activeTab])

  return (
    <Card className="overflow-hidden h-full border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Nossa Localização</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                activeTab === "map" ? "bg-white shadow-sm text-primary font-medium" : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("map")}
            >
              Mapa
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                activeTab === "satellite"
                  ? "bg-white shadow-sm text-primary font-medium"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("satellite")}
            >
              Satélite
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[350px]">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-10 w-10 text-primary mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-600">Carregando mapa...</p>
            </div>
          </div>
        )}

        <iframe
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
          onLoad={() => setIsLoaded(true)}
        ></iframe>

        {/* Map overlay with info */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-start gap-3 mb-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">R. Idalina Figueredo Batista, 406 - Amargosa, BA, 45300-000</p>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm text-gray-700">Aberto 24 horas</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm text-gray-700">(75) 99204-1400</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=-13.035914387285375,-39.588833924922405",
                "_blank",
              )
            }
          >
            <Navigation className="mr-2 h-4 w-4" />
            Como Chegar
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-300"
            onClick={() =>
              window.open("https://www.google.com/maps/place/Posto+Catitú/@-13.0359144,-39.5888339,17z/", "_blank")
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver no Google Maps
          </Button>
        </div>
      </div>

      <div className="p-4 bg-primary/10 text-center">
        <p className="text-primary font-medium">Venha nos visitar! Estamos abertos 24 horas todos os dias.</p>
      </div>
    </Card>
  )
}
