"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Promotion {
  id: number
  title: string
  description: string
  imageSrc: string
  color: string
}

export default function PromotionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const promotions: Promotion[] = [
    {
      id: 1,
      title: "Desconto de R$ 0,20 no Etanol",
      description: "Válido de segunda a quarta-feira, das 10h às 16h",
      imageSrc: "/banner1.jpeg",
      color: "primary",
    },
    {
      id: 2,
      title: "Lavagem Grátis",
      description: "A cada 5 abastecimentos acima de R$ 100",
      imageSrc: "/banner2.jpeg",
      color: "secondary",
    },
    {
      id: 3,
      title: "Café Grátis",
      description: "Em qualquer abastecimento acima de R$ 50",
      imageSrc: "/banner3.jpeg",
      color: "primary",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === promotions.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? promotions.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {promotions.map((promo) => (
            <div key={promo.id} className="min-w-full">
              <Card className="border-0 overflow-hidden">
                <div className="relative h-64 sm:h-80">
                  <Image src={promo.imageSrc || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                  <div
                    className={`absolute inset-0 ${promo.color === "primary" ? "bg-gradient-to-r from-primary/80 to-transparent" : "bg-gradient-to-r from-secondary/80 to-transparent"}`}
                  ></div>
                  <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{promo.title}</h3>
                    <p className="text-white/90 mb-4 max-w-md">{promo.description}</p>
                    <Button className="w-fit bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all">
                      Aproveitar Agora
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-md hover:shadow-lg z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5 text-primary" />
        <span className="sr-only">Anterior</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-md hover:shadow-lg z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5 text-primary" />
        <span className="sr-only">Próximo</span>
      </Button>

      <div className="flex justify-center gap-2 mt-4">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
