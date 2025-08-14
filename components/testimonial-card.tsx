"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  rating: number
  testimonial: string
  imageSrc: string
  role?: string
  darkMode?: boolean
}

export default function TestimonialCard({
  name,
  rating,
  testimonial,
  imageSrc,
  role,
  darkMode = false,
}: TestimonialCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full border-0 ${
        darkMode ? "bg-gray-800/80 backdrop-blur-sm" : "bg-white"
      }`}
    >
      <CardContent className="p-0">
        <div className={`p-6 relative ${darkMode ? "text-white" : ""}`}>
          {/* Quote mark */}
          <div className="absolute top-4 right-6 opacity-10">
            <svg
              width="60"
              height="50"
              viewBox="0 0 60 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={darkMode ? "text-white" : "text-primary"}
            >
              <path
                d="M0 25.1968V49.1935H24.5161V25.1968H8.17204C8.17204 16.129 15.3226 8.87097 24.5161 8.87097V0C10.9677 0 0 10.7419 0 25.1968ZM60 8.87097V0C46.4516 0 35.4839 10.7419 35.4839 25.1968V49.1935H60V25.1968H43.6559C43.6559 16.129 50.8065 8.87097 60 8.87097Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Testimonial text */}
          <div className="mb-8 relative z-10">
            <p className={`italic text-lg leading-relaxed ${darkMode ? "text-white" : "text-gray-900"}`}>
              "{testimonial}"
            </p>
          </div>

          {/* Client info with image */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src={imageSrc || "/placeholder.svg?height=100&width=100"}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className={`font-bold text-lg ${darkMode ? "text-white" : ""}`}>{name}</h3>
              {role && <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{role}</p>}
              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "text-primary fill-primary" : darkMode ? "text-gray-600" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
