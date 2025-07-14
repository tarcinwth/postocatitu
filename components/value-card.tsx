"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export default function ValueCard({ icon: Icon, title, description, delay = 0 }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
