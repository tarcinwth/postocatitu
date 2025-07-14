"use client"
import Image from "next/image"
import { Star } from "lucide-react"
import React from "react"

interface TestimonialFeatureProps {
  quote: string
  author: string
  role?: string
  rating: number
  imageSrc: string
}

export default function TestimonialFeature({ quote, author, role, rating, imageSrc }: TestimonialFeatureProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image src="/vista-posto.jpeg" alt="Background" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-gray-900/80" />
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        {/* Client image */}
        <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-primary/50 overflow-hidden flex-shrink-0">
          <Image src={imageSrc || "/placeholder.svg"} alt={author} fill className="object-cover" />
        </div>

        {/* Quote content */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-4 flex justify-center md:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-6 w-6 ${i < rating ? "text-primary fill-primary" : "text-gray-600"}`} />
            ))}
          </div>

          <blockquote className="text-xl md:text-2xl italic text-white mb-6 relative">
            <span className="absolute -top-6 -left-2 text-8xl opacity-20 text-primary">"</span>
            <p className="relative z-10">
              {quote.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < quote.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </blockquote>

          <div>
            <p className="text-xl font-bold text-white">{author}</p>
            {role && <p className="text-gray-300">{role}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
