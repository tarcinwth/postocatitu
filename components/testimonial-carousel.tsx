"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import TestimonialCard from "@/components/testimonial-card"

interface Testimonial {
  id: number
  name: string
  role: string
  rating: number
  testimonial: string
  imageSrc: string
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Cliente desde 2019",
      rating: 5,
      testimonial:
        "Sempre abasteço aqui. Preço justo, atendimento excelente e a loja de conveniência tem tudo o que preciso. Recomendo a todos!",
      imageSrc: "/images/profile-man.png",
    },
    {
      id: 2,
      name: "Ana Oliveira",
      role: "Cliente desde 2020",
      rating: 5,
      testimonial:
        "A lavagem expressa é ótima! Rápida e deixa o carro impecável. Os funcionários são muito atenciosos e prestativos. Recomendo muito o Posto Catitu.",
      imageSrc: "/images/profile-woman.png",
    },
    {
      id: 3,
      name: "Roberto Almeida",
      role: "Cliente desde 2021",
      rating: 4,
      testimonial:
        "Atendimento 24h é um diferencial. Já precisei abastecer de madrugada e fui muito bem atendido. Combustível de qualidade e preço justo.",
      imageSrc: "/images/profile-man.png",
    },
    {
      id: 4,
      name: "Juliana Mendes",
      role: "Cliente desde 2022",
      rating: 5,
      testimonial:
        "Adoro a loja de conveniência! Tem uma variedade incrível de produtos e os preços são justos. O café é delicioso e sempre fresco.",
      imageSrc: "/images/profile-woman.png",
    },
    {
      id: 5,
      name: "Marcos Pereira",
      role: "Caminhoneiro",
      rating: 5,
      testimonial:
        "Como caminhoneiro, valorizo muito postos com bom atendimento e estrutura. O Posto Catitu tem tudo isso e mais um pouco. Parada obrigatória nas minhas viagens.",
      imageSrc: "/images/profile-man.png",
    },
  ]

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    resetAutoPlay()
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    resetAutoPlay()
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
    }

    autoPlayRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
      }, 6000)

      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="relative h-[400px] md:h-[350px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full h-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="hidden md:block">
                  <TestimonialCard
                    name={testimonials[currentIndex].name}
                    role={testimonials[currentIndex].role}
                    rating={testimonials[currentIndex].rating}
                    testimonial={testimonials[currentIndex].testimonial}
                    imageSrc={testimonials[currentIndex].imageSrc}
                    darkMode={true}
                  />
                </div>
                <div>
                  <TestimonialCard
                    name={testimonials[currentIndex].name}
                    role={testimonials[currentIndex].role}
                    rating={testimonials[currentIndex].rating}
                    testimonial={testimonials[currentIndex].testimonial}
                    imageSrc={testimonials[currentIndex].imageSrc}
                    darkMode={true}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-none text-white rounded-full z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Anterior</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-none text-white rounded-full z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Próximo</span>
      </Button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-primary" : "w-2.5 bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
