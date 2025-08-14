"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"

type Props = {
  heroRef: React.RefObject<HTMLDivElement>
  servicesRef: React.RefObject<HTMLDivElement>
  scrollToSection: (ref: { current: HTMLElement | null }) => void
}

export default function HeroSection({ heroRef, servicesRef, scrollToSection }: Props) {
  return (
    <section ref={heroRef} className="relative h-screen flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/vista-posto.jpeg"
          alt="Posto Catitu - Combustível de qualidade"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-xl space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge className="bg-primary hover:bg-primary/90 text-white px-4 py-1 text-sm">
            24 HORAS - TODOS OS DIAS
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Abasteça com <span className="text-primary">qualidade</span> e economia
          </h1>
          <p className="text-xl text-white/90">
            Combustível de alta performance, atendimento excepcional e os melhores preços da região.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="xl"
              variant="action"
              className="bg-primary hover:bg-primary/90 text-white text-lg relative overflow-hidden group"
              onClick={() => scrollToSection(servicesRef)}
            >
              <span className="relative z-10 flex items-center">
                Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              size="xl"
              variant="white-outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg"
              onClick={() => scrollToSection(servicesRef)}
            >
              Fale Conosco
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        onClick={() => scrollToSection(servicesRef)}
      >
        <ChevronDown className="h-10 w-10 text-white" />
      </motion.div>
    </section>
  )
}


