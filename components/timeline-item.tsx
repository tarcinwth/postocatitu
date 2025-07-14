"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLeft?: boolean
  delay?: number
}

export default function TimelineItem({ year, title, description, isLeft = true, delay = 0 }: TimelineItemProps) {
  return (
    <div className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"} w-full mb-8 md:mb-16`}>
      <motion.div
        className={`w-full md:w-1/2 ${isLeft ? "pr-8 md:pr-12 text-right" : "pl-8 md:pl-12 text-left"}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="inline-block px-3 py-1 mb-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
          {year === "2025" ? "2025 (Planejado)" : year}
        </span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>

      <div className="relative flex items-center justify-center">
        <div className="h-full w-px bg-primary/30 absolute"></div>
        <motion.div
          className="w-5 h-5 rounded-full bg-primary z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        ></motion.div>
      </div>

      <div className="w-full md:w-1/2"></div>
    </div>
  )
}
