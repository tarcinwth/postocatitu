"use client"

import { motion } from "framer-motion"
import { Star, Users, ThumbsUp, Award } from "lucide-react"

export default function TestimonialStats() {
  const stats = [
    {
      icon: Star,
      value: "4,5",
      label: "Avaliação média",
      color: "bg-yellow-500/20",
      textColor: "text-yellow-500",
    },
    {
      icon: Users,
      value: "5000+",
      label: "Clientes satisfeitos",
      color: "bg-blue-500/20",
      textColor: "text-blue-500",
    },
    {
      icon: ThumbsUp,
      value: "98%",
      label: "Recomendam",
      color: "bg-green-500/20",
      textColor: "text-green-500",
    },
    {
      icon: Award,
      value: "3",
      label: "Anos consecutivos premiados",
      color: "bg-primary/20",
      textColor: "text-primary",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center"
        >
          <div className={`w-12 h-12 mx-auto rounded-full ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">{stat.value}</h3>
          <p className="text-gray-400 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
