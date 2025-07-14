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
  ArrowRight,
  ChevronDown,
  Award,
  Users,
  Fuel,
  ShieldCheck,
  Leaf,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import ServiceCard from "@/components/service-card"
import PriceCounter from "@/components/price-counter"
import TimelineItem from "@/components/timeline-item"
import ValueCard from "@/components/value-card"
import { motion, AnimatePresence } from "framer-motion"
import FloatingActionButton from "@/components/floating-action-button"
import TestimonialCarousel from "@/components/testimonial-carousel"
import TestimonialGrid from "@/components/testimonial-grid"
import TestimonialFeature from "@/components/testimonial-feature"
import TestimonialStats from "@/components/testimonial-stats"
import ContactForm from "@/components/contact-form"
import MapCard from "@/components/map-card"
import ContactInfoCard from "@/components/contact-info-card"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section based on scroll position
      const sections = [
        { ref: heroRef, id: "home" },
        { ref: servicesRef, id: "servicos" },
        { ref: aboutRef, id: "sobre" },
        { ref: testimonialsRef, id: "depoimentos" },
        { ref: contactRef, id: "contato" },
      ]

      for (const section of sections.reverse()) {
        if (section.ref.current && window.scrollY >= section.ref.current.offsetTop - 200) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    setMobileMenuOpen(false)
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 80,
        behavior: "smooth",
      })
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
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end p-6">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
                <span className="sr-only">Fechar menu</span>
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
              <Link
                href="#home"
                onClick={() => scrollToSection(heroRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors"
              >
                Início
              </Link>
              <Link
                href="#servicos"
                onClick={() => scrollToSection(servicesRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors"
              >
                Serviços
              </Link>
              <Link
                href="#sobre"
                onClick={() => scrollToSection(aboutRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors"
              >
                Sobre Nós
              </Link>
              <Link
                href="#depoimentos"
                onClick={() => scrollToSection(testimonialsRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors"
              >
                Depoimentos
              </Link>
              <Link
                href="#contato"
                onClick={() => scrollToSection(contactRef)}
                className="text-xl font-bold text-white hover:text-primary transition-colors"
              >
                Contato
              </Link>
              <Button
                className="mt-6 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg"
                onClick={() => scrollToSection(contactRef)}
              >
                Fale Conosco
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/vista-posto.jpeg"
              alt="Posto Catitu - Combustível de qualidade"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>

          <div className="container relative z-10">
            <motion.div
              className="max-w-xl space-y-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="bg-primary hover:bg-primary/90 text-white px-4 py-1 text-sm">
                24 HORAS - TODOS OS DIAS
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Abasteça com <span className="text-primary">qualidade</span> e economia
              </h1>
              <p className="text-xl text-white/90">
                Combustível de alta performance, atendimento excepcional e os melhores preços da região.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="xl"
                  variant="action"
                  className="bg-primary hover:bg-primary/90 text-white text-lg relative overflow-hidden group"
                  onClick={() => scrollToSection(servicesRef)}
                >
                  <span className="relative z-10 flex items-center">
                    Nossos Serviços
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button
                  size="xl"
                  variant="white-outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Fale Conosco
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            onClick={() => scrollToSection(servicesRef)}
          >
            <ChevronDown className="h-10 w-10 text-white" />
          </motion.div>
        </section>

        {/* Price Counter Section */}
        <section className="py-12 bg-gray-100">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <PriceCounter label="Gasolina Comum" finalValue={6.59} />
              <PriceCounter label="Gasolina Aditivada" finalValue={6.59} />
              <PriceCounter label="Etanol" finalValue={4.99} />
              <PriceCounter label="Diesel S10" finalValue={5.99} />
              <PriceCounter label="Diesel S500" finalValue={5.95} />
            </div>
          </div>
        </section>

        {/* Services Section */}
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Mais que um posto de combustível</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Oferecemos uma experiência completa para você e seu veículo
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ServiceCard
                  title="Combustível Premium"
                  description="Gasolina, etanol e diesel de alta qualidade que garantem melhor desempenho e economia para seu veículo."
                  icon="fuel"
                  imageSrc="/banner3.jpeg"
                  hoverEffect={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ServiceCard
                  title="Loja de Conveniência"
                  description="Produtos frescos, lanches, bebidas e itens essenciais para sua viagem ou dia a dia."
                  icon="store"
                  imageSrc="/atendimento1.jpeg"
                  hoverEffect={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ServiceCard
                  title="Lavagem Expressa"
                  description="Serviço rápido e eficiente de lavagem que deixa seu veículo impecável em poucos minutos."
                  icon="car-wash"
                  imageSrc="/atendimento3.jpeg"
                  hoverEffect={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ServiceCard
                  title="Troca de Óleo"
                  description="Utilizamos as melhores marcas do mercado e oferecemos serviço rápido com profissionais qualificados."
                  icon="oil"
                  imageSrc="/atendimento2.jpeg"
                  hoverEffect={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ServiceCard
                  title="Calibragem de Pneus"
                  description="Serviço gratuito de calibragem com equipamentos de alta precisão para garantir segurança e economia."
                  icon="tire"
                  imageSrc="/banner1.jpeg"
                  hoverEffect={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ServiceCard
                  title="Atendimento 24h"
                  description="Estamos sempre abertos para atender suas necessidades a qualquer hora do dia ou da noite."
                  icon="24h"
                  imageSrc="/vista-posto.jpeg"
                  hoverEffect={true}
                />
              </motion.div>
            </div>
          </div>
        </section>

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
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossa história e valores</h2>
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
                className="text-2xl font-bold mb-12 text-center"
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
                className="text-2xl font-bold mb-10 text-center"
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

        {/* Testimonials Section - Fully Enhanced */}
        <section ref={testimonialsRef} className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="inline-block px-4 py-1 mb-3 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  DEPOIMENTOS
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">O que nossos clientes dizem</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  A satisfação dos nossos clientes é o nosso maior orgulho
                </p>
              </motion.div>
            </div>

            {/* Featured Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <TestimonialFeature
                quote="Ótimo atendimento, rápido e eficiente.
Preço do combustível dentro do esperado.
Serve cafezinho sempre quente.
Tem sanitários, calibrador e lavagem de vidros.
Trabalha com todos os tipos de combustíveis.
Vende outros produtos, como óleos e aditivos."
                author="João Carvalho"
                role="Motorista Profissional"
                rating={5}
                imageSrc="/images/profile-man.png"
              />
            </motion.div>

            {/* Testimonial Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <TestimonialStats />
            </motion.div>

            {/* Testimonial Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <TestimonialCarousel />
            </motion.div>

            {/* Testimonial Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative mb-16">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                <div className="flex justify-center">
                  <span className="relative bg-gray-800 px-6 -top-3 text-gray-400 text-sm uppercase tracking-wider">
                    Mais depoimentos
                  </span>
                </div>
              </div>

              <TestimonialGrid />
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Button variant="primary" className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg">
                Ver Todos os Depoimentos
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section - Enhanced */}
        <section ref={contactRef} className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="inline-block px-4 py-1 mb-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  CONTATO
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Estamos à sua disposição</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Entre em contato conosco para tirar dúvidas, fazer sugestões ou conhecer mais sobre nossos serviços.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ContactInfoCard />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ContactForm />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <MapCard />
            </motion.div>
          </div>
        </section>
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
