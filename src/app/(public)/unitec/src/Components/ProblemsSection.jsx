import React from "react"
import { Zap, Store, BarChart2 } from "lucide-react"
import ERP from '../Assets/image1.png'
const ProblemsSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#1B4B96] to-[#42B7E9] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 font-outfit">
          Sabemos os desafios do seu dia a dia.
        </h2>
        <p className="text-lg md:text-xl text-white text-center max-w-3xl mx-auto mb-12">
          Está enfrentando lentidão no caixa? Ferramentas limitadas que complicam a rotina? Gestão financeira confusa e
          pouco integrada? Nosso ERP foi criado para resolver tudo isso.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/2 space-y-6">
            <HighlightCard
              icon={<Zap className="w-8 h-8 text-[#42B7E9]" />}
              title="Agilidade na frente de caixa"
              description="Processe transações rapidamente e reduza filas com nossa interface intuitiva."
            />
            <HighlightCard
              icon={<Store className="w-8 h-8 text-[#42B7E9]" />}
              title="Gestão multi-loja sem complicações"
              description="Gerencie várias lojas de forma centralizada, simplificando suas operações."
            />
            <HighlightCard
              icon={<BarChart2 className="w-8 h-8 text-[#42B7E9]" />}
              title="Controle financeiro em tempo real"
              description="Monitore suas finanças e estoque em tempo real para tomar decisões informadas."
            />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <img
                src={ERP || "/placeholder.svg"}
                alt="ERP Dashboard"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HighlightCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <h3 className="text-[#1B4B96] font-semibold text-lg mb-2 font-outfit">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
)

export default ProblemsSection;

