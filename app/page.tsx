"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  Mail,
  Menu,
  X,
  Award,
  Users,
  Fuel,
  ShieldCheck,
  Leaf,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/enhanced-button"
import PriceCounter from "@/components/price-counter"
import TimelineItem from "@/components/timeline-item"
import ValueCard from "@/components/value-card"
import { motion, AnimatePresence } from "framer-motion"
const FloatingActionButton = dynamic(() => import("@/components/floating-action-button"), { ssr: false })
// Removido fetch duplicado de promoções; o componente PromotionList trata o carregamento
const FuelPrices = dynamic(() => import("@/components/fuel-prices"), { ssr: false })
const PromotionList = dynamic(() => import("@/components/promotion-list"), { ssr: false })
const FAQAccordion = dynamic(() => import("@/components/faq-accordion"), { ssr: false })
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), { ssr: false })
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), { ssr: false })
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: false })
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false })

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  // Estado de promoções removido; centralizado em <PromotionList />
  const menuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Handle scroll events
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (y !== scrollY) setScrollY(y)

        const sections = [
          { ref: contactRef, id: "contato" },
          { ref: testimonialsRef, id: "depoimentos" },
          { ref: aboutRef, id: "sobre" },
          { ref: servicesRef, id: "servicos" },
          { ref: heroRef, id: "home" },
        ]
        for (const section of sections) {
          const el = section.ref.current
          if (el && y >= el.offsetTop - 200) {
            if (activeSection !== section.id) setActiveSection(section.id)
            break
          }
        }
        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll as any)
  }, [])

  // Removido efeito de carregamento de promoções

  useEffect(() => {
    if (mobileMenuOpen) {
      // Foco no primeiro link
      setTimeout(() => { firstLinkRef.current?.focus() }, 50)
      // Fechar ao pressionar Esc
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false)
      }
      // Fechar ao clicar fora
      const handleClick = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMobileMenuOpen(false)
      }
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClick)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("mousedown", handleClick)
      }
    }
  }, [mobileMenuOpen])

  const scrollToSection = (sectionRef: { current: HTMLElement | null }) => {
    setMobileMenuOpen(false)
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrollY > 50 ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Posto Catitu" width={40} height={40} className="h-10 w-auto rounded-full" />
            <span className={`text-xl font-bold ${scrollY > 50 ? "text-primary" : "text-white"}`}>Posto Catitu</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#home"
              onClick={() => scrollToSection(heroRef)}
              className={`text-sm font-medium transition-colors ${
                activeSection === "home"
                  ? scrollY > 50
                    ? "text-primary"
                    : "text-white font-bold"
                  : scrollY > 50
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Início
            </Link>
            <Link
              href="#servicos"
              onClick={() => scrollToSection(servicesRef)}
              className={`text-sm font-medium transition-colors ${
                activeSection === "servicos"
                  ? scrollY > 50
                    ? "text-primary"
                    : "text-white font-bold"
                  : scrollY > 50
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Serviços
            </Link>
            <Link
              href="#sobre"
              onClick={() => scrollToSection(aboutRef)}
              className={`text-sm font-medium transition-colors ${
                activeSection === "sobre"
                  ? scrollY > 50
                    ? "text-primary"
                    : "text-white font-bold"
                  : scrollY > 50
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Sobre Nós
            </Link>
            <Link
              href="#depoimentos"
              onClick={() => scrollToSection(testimonialsRef)}
              className={`text-sm font-medium transition-colors ${
                activeSection === "depoimentos"
                  ? scrollY > 50
                    ? "text-primary"
                    : "text-white font-bold"
                  : scrollY > 50
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Depoimentos
            </Link>
            <Link
              href="#contato"
              onClick={() => scrollToSection(contactRef)}
              className={`text-sm font-medium transition-colors ${
                activeSection === "contato"
                  ? scrollY > 50
                    ? "text-primary"
                    : "text-white font-bold"
                  : scrollY > 50
                    ? "text-gray-700 hover:text-primary"
                    : "text-white/80 hover:text-white"
              }`}
            >
              Contato
            </Link>
          </nav>

          <Button
            className={`hidden md:flex ${
              scrollY > 50
                ? "bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg"
                : "bg-white text-primary hover:bg-white/90 shadow-md"
            }`}
            onClick={() => scrollToSection(contactRef)}
          >
            Fale Conosco
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={`h-6 w-6 ${scrollY > 50 ? "text-primary" : "text-white"}`} />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex justify-end p-6">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu">
                <X className="h-6 w-6 text-white" />
                <span className="sr-only">Fechar menu</span>
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-6" aria-label="Menu principal">
              <Link
                href="#home"
                ref={firstLinkRef}
                tabIndex={0}
                onClick={() => scrollToSection(heroRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              >
                Início
              </Link>
              <Link
                href="#servicos"
                onClick={() => scrollToSection(servicesRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              >
                Serviços
              </Link>
              <Link
                href="#sobre"
                onClick={() => scrollToSection(aboutRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              >
                Sobre Nós
              </Link>
              <Link
                href="#depoimentos"
                onClick={() => scrollToSection(testimonialsRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              >
                Depoimentos
              </Link>
              <Link
                href="#contato"
                onClick={() => scrollToSection(contactRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              >
                Contato
              </Link>
              <Button
                className="mt-6 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => scrollToSection(contactRef)}
              >
                Fale Conosco
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <HeroSection heroRef={heroRef} servicesRef={servicesRef} scrollToSection={scrollToSection} />

        {/* Price Counter Section */}
        <section className="py-12 bg-gray-100">
          <div className="container">
            <FuelPrices />
          </div>
        </section>

        {/* Promoções Section */}
        <PromotionList />

        <div ref={servicesRef}>
          <ServicesSection servicesRef={servicesRef} />
        </div>

        {/* About Section - Enhanced */}
        <section ref={aboutRef} className="py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="inline-block px-4 py-1 mb-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  SOBRE NÓS
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Nossa história e valores</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Conheça a trajetória do Posto Catitu e os valores que nos guiam diariamente
                </p>
              </motion.div>
            </div>

            {/* História e Visão Geral */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Sobre o Posto Catitú</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Desde 2018, o Posto Catitú tem sido sinônimo de qualidade e confiança em Amargosa e região. Nossa
                  história começou com um sonho de oferecer o melhor serviço em abastecimento e atendimento aos nossos
                  clientes.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Localizado na R. Idalina Figueredo Batista, 406 - Amargosa, BA, nos tornamos um ponto de referência
                  para motoristas locais e viajantes.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Trabalhamos com os melhores fornecedores do mercado, garantindo combustível de alta qualidade e
                  serviços que vão além do abastecimento.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">7+</span>
                    <span className="text-gray-600">Anos de experiência</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">24h</span>
                    <span className="text-gray-600">Atendimento</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">5k+</span>
                    <span className="text-gray-600">Clientes satisfeitos</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold text-primary">100%</span>
                    <span className="text-gray-600">Combustível de qualidade</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Image src="/vista-posto.jpeg" alt="Posto Catitu" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-2 text-primary">Nossa Missão</h3>
                    <p className="text-gray-800">
                      Oferecer produtos e serviços de qualidade, com atendimento diferenciado, proporcionando a melhor
                      experiência aos nossos clientes e contribuindo para o desenvolvimento da nossa região.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Timeline da Nossa História */}
            <div className="mb-20">
              <motion.h3
                className="text-2xl font-extrabold mb-12 text-center text-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Nossa Trajetória
              </motion.h3>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/20"></div>

                <TimelineItem
                  year="2018"
                  title="Fundação do Posto Catitu"
                  description="Inauguração do posto com foco em qualidade de combustível e excelência no atendimento."
                  isLeft={true}
                  delay={0.1}
                />

                <TimelineItem
                  year="2019"
                  title="Expansão de Serviços"
                  description="Ampliação da área de abastecimento e início do serviço de lavagem expressa."
                  isLeft={false}
                  delay={0.2}
                />

                <TimelineItem
                  year="2020"
                  title="Modernização"
                  description="Renovação das instalações e implementação de sistema digital de controle de abastecimento."
                  isLeft={true}
                  delay={0.3}
                />

                <TimelineItem
                  year="2021"
                  title="Loja de Conveniência"
                  description="Inauguração da loja de conveniência com produtos variados para melhor atender nossos clientes."
                  isLeft={false}
                  delay={0.4}
                />

                <TimelineItem
                  year="2023"
                  title="Atualidade"
                  description="Consolidação como referência em qualidade de combustíveis e atendimento na região, com funcionamento 24 horas."
                  isLeft={true}
                  delay={0.5}
                />
              </div>
            </div>

            {/* Nossos Valores */}
            <div>
              <motion.h3
                className="text-2xl font-extrabold mb-10 text-center text-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Nossos Valores
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ValueCard
                  icon={ShieldCheck}
                  title="Qualidade"
                  description="Garantimos a procedência e qualidade de todos os nossos combustíveis, com rigoroso controle e testes periódicos."
                  delay={0.1}
                />

                <ValueCard
                  icon={Users}
                  title="Atendimento"
                  description="Nossa equipe é treinada para oferecer um atendimento cordial, rápido e eficiente, sempre com um sorriso no rosto."
                  delay={0.2}
                />

                <ValueCard
                  icon={Award}
                  title="Excelência"
                  description="Buscamos a excelência em tudo o que fazemos, desde a manutenção das instalações até os serviços prestados."
                  delay={0.3}
                />

                <ValueCard
                  icon={Leaf}
                  title="Responsabilidade Ambiental"
                  description="Adotamos práticas sustentáveis e respeitamos o meio ambiente em todas as nossas operações."
                  delay={0.4}
                />

                <ValueCard
                  icon={Heart}
                  title="Compromisso Social"
                  description="Participamos ativamente de iniciativas que beneficiam a comunidade local, contribuindo para o desenvolvimento da região."
                  delay={0.5}
                />

                <ValueCard
                  icon={Fuel}
                  title="Inovação"
                  description="Estamos sempre em busca de novas tecnologias e métodos para melhorar nossos serviços e a experiência dos clientes."
                  delay={0.6}
                />
              </div>
            </div>
          </div>
        </section>

        <div ref={testimonialsRef}>
          <TestimonialsSection testimonialsRef={testimonialsRef} />
        </div>

        {/* FAQ Accordion */}
        <FAQAccordion />

        <div ref={contactRef}>
          <ContactSection contactRef={contactRef} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Image src="/logo.png" alt="Posto Catitu" width={50} height={50} className="h-12 w-auto rounded-full" />
                <span className="text-2xl font-bold text-white">Posto Catitu</span>
              </div>
              <p className="text-gray-400 mb-6">
                Combustível de qualidade, preço justo e atendimento excepcional. Estamos sempre prontos para atender
                você.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/posto_catitu/"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="mailto:postocatitu@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#home"
                    onClick={() => scrollToSection(heroRef)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>Início</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#servicos"
                    onClick={() => scrollToSection(servicesRef)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>Serviços</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#sobre"
                    onClick={() => scrollToSection(aboutRef)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>Sobre Nós</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#depoimentos"
                    onClick={() => scrollToSection(testimonialsRef)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>Depoimentos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contato"
                    onClick={() => scrollToSection(contactRef)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>Contato</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Serviços</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>Combustível Premium</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>Loja de Conveniência</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>Lavagem Expressa</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>Troca de Óleo</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>Calibragem de Pneus</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>R. Idalina Figueredo Batista, 406 - Amargosa, BA, 45300-000</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <span>(75) 99204-1400</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <span>postocatitu@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <span>Aberto 24 horas</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p className="mb-2">
              © {new Date().getFullYear()} Posto Catitu. CNPJ: 33.880.610/0001-86. Todos os direitos reservados.
            </p>
            <p className="text-sm">
              Desenvolvido com ❤️ por{" "}
              <a
                href="https://studiowoota.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Wota Studios
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Replace the WhatsApp Floating Button with our enhanced FAB */}
      <FloatingActionButton />
    </div>
  )
}
