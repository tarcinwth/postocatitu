"use client"

import { motion } from "framer-motion"
import ServiceCard from "@/components/service-card"

type Props = { servicesRef: React.RefObject<HTMLDivElement> }

export default function ServicesSection({ servicesRef }: Props) {
  return (
    <section ref={servicesRef} className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1 mb-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
              NOSSOS SERVIÇOS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Mais que um posto de combustível</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Oferecemos uma experiência completa para você e seu veículo</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Combustível Premium", description: "Gasolina, etanol e diesel de alta qualidade que garantem melhor desempenho e economia para seu veículo.", icon: "fuel", imageSrc: "/banner3.jpeg" },
            { title: "Loja de Conveniência", description: "Produtos frescos, lanches, bebidas e itens essenciais para sua viagem ou dia a dia.", icon: "store", imageSrc: "/atendimento1.jpeg" },
            { title: "Lavagem Expressa", description: "Serviço rápido e eficiente de lavagem que deixa seu veículo impecável em poucos minutos.", icon: "car-wash", imageSrc: "/atendimento3.jpeg" },
            { title: "Troca de Óleo", description: "Utilizamos as melhores marcas do mercado e oferecemos serviço rápido com profissionais qualificados.", icon: "oil", imageSrc: "/atendimento2.jpeg" },
            { title: "Calibragem de Pneus", description: "Serviço gratuito de calibragem com equipamentos de alta precisão para garantir segurança e economia.", icon: "tire", imageSrc: "/banner1.jpeg" },
            { title: "Atendimento 24h", description: "Estamos sempre abertos para atender suas necessidades a qualquer hora do dia ou da noite.", icon: "24h", imageSrc: "/vista-posto.jpeg" },
          ].map((card, idx) => (
            <motion.div key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ServiceCard {...card} hoverEffect={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


