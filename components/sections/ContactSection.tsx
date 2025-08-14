"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const ContactForm = dynamic(() => import("@/components/contact-form"), { ssr: false })
const MapCard = dynamic(() => import("@/components/map-card"), { ssr: false })
const ContactInfoCard = dynamic(() => import("@/components/contact-info-card"), { ssr: false })

type Props = { contactRef: React.RefObject<HTMLDivElement> }

export default function ContactSection({ contactRef }: Props) {
  return (
    <section ref={contactRef} className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-100px" }}>
            <span className="inline-block px-4 py-1 mb-3 bg-primary/10 text-primary rounded-full text-sm font-medium">CONTATO</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Estamos à sua disposição</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Entre em contato conosco para tirar dúvidas, fazer sugestões ou conhecer mais sobre nossos serviços.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-100px" }}>
            <ContactInfoCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}>
            <ContactForm />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true, margin: "-100px" }}>
          <MapCard />
        </motion.div>
      </div>
    </section>
  )
}


