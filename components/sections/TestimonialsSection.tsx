"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const TestimonialCarousel = dynamic(() => import("@/components/testimonial-carousel"), { ssr: false })
const TestimonialGrid = dynamic(() => import("@/components/testimonial-grid"), { ssr: false })
const TestimonialFeature = dynamic(() => import("@/components/testimonial-feature"), { ssr: false })
const TestimonialStats = dynamic(() => import("@/components/testimonial-stats"), { ssr: false })

type Props = { testimonialsRef: React.RefObject<HTMLDivElement> }

export default function TestimonialsSection({ testimonialsRef }: Props) {
  return (
    <section ref={testimonialsRef} className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1 mb-3 bg-primary/20 text-primary rounded-full text-sm font-medium">DEPOIMENTOS</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">A satisfação dos nossos clientes é o nosso maior orgulho</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }} className="mb-16">
          <TestimonialFeature quote={`Ótimo atendimento, rápido e eficiente.
Preço do combustível dentro do esperado.
Serve cafezinho sempre quente.
Tem sanitários, calibrador e lavagem de vidros.
Trabalha com todos os tipos de combustíveis.
Vende outros produtos, como óleos e aditivos.`} author="João Carvalho" role="Motorista Profissional" rating={5} imageSrc="/images/profile-man.png" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true, margin: "-100px" }} className="mb-16">
          <TestimonialStats />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true, margin: "-100px" }} className="mb-16">
          <TestimonialCarousel />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true, margin: "-100px" }}>
          <div className="relative mb-16">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <div className="flex justify-center">
              <span className="relative bg-gray-800 px-6 -top-3 text-gray-400 text-sm uppercase tracking-wider">Mais depoimentos</span>
            </div>
          </div>
          <TestimonialGrid />
        </motion.div>
      </div>
    </section>
  )
}


