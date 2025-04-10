import React from "react"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
const SoliciteDemo = () => {
  return (
    <section id="contato" className="py-16 md:py-24 bg-gradient-to-br from-[#1B4B96] to-[#42B7E9] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-outfit">
            Quer Levar Seu Negócio ao Próximo Nível?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white text-opacity-90">
            Diga adeus às dores de cabeça com sistemas ultrapassados. Descubra como nosso ERP inovador pode impulsionar
            sua eficiência e lucratividade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/solicitar-demonstracao"
              className="bg-white text-[#1B4B96] font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg flex items-center justify-center group"
            >
              Agende Sua Demonstração Exclusiva
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/11933787147"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 shadow-lg flex items-center justify-center"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Converse Conosco no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SoliciteDemo

