"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
}

export default function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-48 md:h-64 overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => openModal(index)}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">Ver imagem</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10 backdrop-blur-sm bg-black/30 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Fechar</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 backdrop-blur-sm bg-black/30 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Anterior</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 backdrop-blur-sm bg-black/30 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Próximo</span>
            </Button>

            <motion.div
              className="relative w-full max-w-4xl h-[70vh] max-h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex].src || "/placeholder.svg"}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/40"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
