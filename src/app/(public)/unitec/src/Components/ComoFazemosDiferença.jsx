import React from "react"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

const ComoFazemosDiferenca = () => {
  return (
    <section className="bg-gradient-to-br from-[#1B4B96] to-[#42B7E9] py-16 md:py-24 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 font-outfit">
            Por Que Escolher Nosso ERP?
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-8">
              <p className="text-lg md:text-xl leading-relaxed">
                Com mais de 20 anos no mercado, entendemos as dores do varejo. Nosso ERP combina tecnologia de ponta com
                atendimento personalizado para facilitar sua vida e aumentar sua rentabilidade.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-white mr-2 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/solicitar-demonstracao"
                className="inline-block w-full bg-white text-[#1B4B96] font-semibold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg text-center"
              >
                Solicite uma demonstração
              </Link>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-0 bg-white opacity-20 rounded-lg transform -rotate-6"></div>
                <img
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80"
                  alt="Equipe usando ERP"
                  className="rounded-lg shadow-2xl relative z-10 w-full h-auto aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const benefits = [
  "Preço justo, sem custos escondidos.",
  "PDV rápido e confiável.",
  "Controle completo: estoque, contas, fluxo de caixa e mais.",
  "Segurança máxima com plataforma Linux.",
  "Suporte todos os dias, até as 22h, para você nunca ficar na mão.",
]

export default ComoFazemosDiferenca

