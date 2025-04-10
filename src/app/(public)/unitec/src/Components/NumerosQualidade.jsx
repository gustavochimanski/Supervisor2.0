import React from "react"
import { CheckCircle, Users, ShoppingCart } from "lucide-react"

const NumerosQualidade = () => {
  return (
    <section
      id="numeros-qualidade"
      className="py-16 md:py-24 bg-gradient-to-br from-[#1B4B96] to-[#42B7E9] text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 font-outfit relative z-10">
            Resultados Que Você Pode Confiar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">
            <div className="space-y-12">
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} />
              ))}
            </div>
            <div className="relative">
              <div className="max-w-xl mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Dashboard Analytics"
                  className="rounded-lg shadow-2xl w-full h-auto aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4B96] to-transparent opacity-60 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StatItem = ({ icon: Icon, number, text }) => (
  <div className="flex items-start space-x-4 group">
    <div className="flex-shrink-0 p-2 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <div className="text-4xl font-bold mb-1 group-hover:text-[#42B7E9] transition-colors duration-300">{number}</div>
      <div className="text-lg text-white text-opacity-80">{text}</div>
    </div>
  </div>
)

const stats = [
  {
    icon: CheckCircle,
    number: "20+",
    text: "anos no varejo",
  },
  {
    icon: Users,
    number: "99%",
    text: "de satisfação dos clientes",
  },
  {
    icon: ShoppingCart,
    number: "Diversos",
    text: "setores atendidos: supermercados, restaurantes, padarias e mais",
  },
]

export default NumerosQualidade

