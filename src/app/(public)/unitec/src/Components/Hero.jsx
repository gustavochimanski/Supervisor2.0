import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Como funciona", href: "#funcionalidades" },
    { name: "Clientes Satisfeitos", href: "#depoimentos" },
    { name: "Por que nos escolher", href: "#numeros-qualidade" },
    { name: "Contato", href: "#contato" },
  ]

  const smoothScroll = (e, target) => {
    e.preventDefault()
    const element = document.querySelector(target)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-white font-inter">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20(1)-c4UIPctCZQgVIJJPcKs7eA0V5m2iCI.png"
            alt="Unitec Logo"
            className="h-24 w-auto"
          />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#1B4B96] p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => smoothScroll(e, item.href)}
              className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors font-inter"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg p-4 flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => smoothScroll(e, item.href)}
              className="block py-2 text-[#1B4B96] hover:text-[#42B7E9] transition-colors font-inter"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-center max-w-7xl mx-auto">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B4B96] leading-tight font-outfit">
                Pronto Para Revolucionar Seu Comércio?
              </h1>
              <p className="text-lg md:text-xl text-[#42B7E9] leading-relaxed font-inter">
                Não perca mais tempo com sistemas lentos e complicados. Descubra como nosso ERP pode transformar sua
                gestão.
              </p>
              <Link
                to="/solicitar-demonstracao"
                className="inline-flex bg-gradient-to-r from-[#1B4B96] to-[#42B7E9] text-white hover:from-[#42B7E9] hover:to-[#1B4B96] text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-medium font-inter"
              >
                Solicite Uma Demonstração Agora!
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%206%20(1)-eVzAYDz5LO0tfkperINn5l7CbvXqr9.png"
                alt="Dashboard Preview"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

