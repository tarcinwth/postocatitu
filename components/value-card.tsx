"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: React.ReactNode
  delay?: number
}

export default function ValueCard({ icon: Icon, title, description, delay = 0 }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      <Card className="overflow-hidden h-full border-0 shadow-lg">
        <CardContent className="p-8 flex flex-col items-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-sm">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-extrabold mb-2 text-primary text-center drop-shadow-sm">{title}</h3>
          <div className="text-lg font-semibold text-gray-800 text-center mb-1" style={{wordBreak:'break-word'}}>{description}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
