import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos dinheiro, cartões de crédito, débito, Pix e vale combustível.",
  },
  {
    question: "O posto funciona 24 horas?",
    answer: "Sim, nosso atendimento é 24h todos os dias da semana.",
  },
  {
    question: "Vocês oferecem lavagem de carro?",
    answer: "Sim, temos serviço de lavagem expressa e completa, consulte valores na loja.",
  },
  {
    question: "Como funcionam as promoções?",
    answer: "As promoções são atualizadas regularmente. Fique atento ao nosso site e redes sociais!",
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-primary mb-8 text-center">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors hover:bg-primary/5"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-header-${idx}`}
                onClick={() => toggle(idx)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <motion.span animate={{ rotate: openIndex === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-header-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.3, delay: 0.12 } }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.28, delay: 0.13 }}
                      className="px-6 pb-4 text-gray-700 text-base"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 