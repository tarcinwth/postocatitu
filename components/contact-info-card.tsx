"use client"

import { MapPin, Clock, Phone, Mail, Instagram, Facebook, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactInfoCard() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: "R. Idalina Figueredo Batista, 406 - Amargosa, BA, 45300-000",
      action: {
        label: "Ver no Mapa",
        href: "https://goo.gl/maps/YourGoogleMapsLink",
        icon: ExternalLink,
      },
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(75) 99204-1400",
      action: {
        label: "Ligar Agora",
        href: "tel:+5575992041400",
        icon: Phone,
      },
    },
    {
      icon: Mail,
      title: "E-mail",
      content: "postocatitu@gmail.com",
      action: {
        label: "Enviar Email",
        href: "mailto:postocatitu@gmail.com",
        icon: Mail,
      },
    },
    {
      icon: Clock,
      title: "Horário de Funcionamento",
      content: "24 horas, todos os dias",
      action: null,
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <h3 className="text-2xl font-bold p-6 border-b border-gray-100">Informações de Contato</h3>

      <div className="p-6">
        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.content}</p>
                {item.action && (
                  <Link
                    href={item.action.href}
                    target={item.action.href.startsWith("http") ? "_blank" : undefined}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {item.action.label}
                    <item.action.icon className="ml-1 h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://www.instagram.com/posto_catitu/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 transition-transform hover:scale-105"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white bg-blue-600 transition-transform hover:scale-105"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </Link>
            <Link
              href="mailto:postocatitu@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white bg-red-500 transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 bg-primary/10 text-center">
        <p className="text-primary font-medium">Estamos ansiosos para atendê-lo!</p>
      </div>
    </div>
  )
}
