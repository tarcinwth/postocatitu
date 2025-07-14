"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

interface TeamMember {
  name: string
  role: string
  imageSrc: string
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: "Equipe de Frentistas",
      role: "Atendimento ao Cliente",
      imageSrc: "/atendimento1.jpeg",
    },
    {
      name: "Equipe de Abastecimento",
      role: "Serviço Rápido e Eficiente",
      imageSrc: "/atendimento2.jpeg",
    },
    {
      name: "Equipe de Atendimento",
      role: "Sempre Prontos para Ajudar",
      imageSrc: "/atendimento3.jpeg",
    },
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1 mb-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
              NOSSA EQUIPE
            </span>
            <h2 className="text-4xl font-bold mb-4">Profissionais dedicados ao seu serviço</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa equipe está sempre pronta para atender você com excelência e dedicação
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden h-full border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-64">
                  <Image src={member.imageSrc || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
