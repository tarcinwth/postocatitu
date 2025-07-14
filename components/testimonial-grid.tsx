"use client"

import { motion } from "framer-motion"
import TestimonialCard from "@/components/testimonial-card"

interface Testimonial {
  id: number
  name: string
  role: string
  rating: number
  testimonial: string
  imageSrc: string
}

export default function TestimonialGrid() {
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
    {
      id: 6,
      name: "Fernanda Costa",
      role: "Cliente desde 2018",
      rating: 5,
      testimonial:
        "Desde a inauguração, o Posto Catitu mantém o mesmo padrão de qualidade. Combustível excelente e atendimento sempre cordial.",
      imageSrc: "/images/profile-woman.png",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <TestimonialCard
            name={testimonial.name}
            role={testimonial.role}
            rating={testimonial.rating}
            testimonial={testimonial.testimonial}
            imageSrc={testimonial.imageSrc}
            darkMode={true}
          />
        </motion.div>
      ))}
    </div>
  )
}
