"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PriceCounterProps {
  label: string
  finalValue: number
  prefix?: string
  duration?: number
  decimals?: number
}

export default function PriceCounter({
  label,
  finalValue,
  prefix = "R$",
  duration = 2000,
  decimals = 2,
}: PriceCounterProps) {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(progress * finalValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [finalValue, duration, isInView])

  return (
    <motion.div
      className="text-center p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsInView(true)}
    >
      <h3 className="text-lg font-medium text-gray-600 mb-2">{label}</h3>
      <p className="text-3xl font-bold text-primary">
        {prefix} {count.toFixed(decimals)}
      </p>
    </motion.div>
  )
}
