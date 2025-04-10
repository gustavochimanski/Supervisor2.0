import React from "react"
import { Mail, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#F0F4F8] text-[#1B4B96] py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Brand and Slogan */}
          <div className="md:col-span-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20(1)-c4UIPctCZQgVIJJPcKs7eA0V5m2iCI.png"
              alt="Unitec Logo"
              className="h-24 w-auto"
            />
            <p className="text-sm text-center md:text-left">Tecnologia de ponta para simplificar o varejo.</p>
          </div>

          {/* Links Úteis */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-[#1B4B96]">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <a href="#sobre-nos" className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contato" className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-[#1B4B96]">Contato</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-center md:justify-start">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:gustavo@gtechtecnologia.com.br"
                  className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors"
                >
                  gustavo@gtechtecnologia.com.br
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+5511933787147" className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors">
                  (11) 93378-7147
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1B4B96] border-opacity-20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Unitec. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

