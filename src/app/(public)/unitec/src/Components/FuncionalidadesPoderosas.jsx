import React, { useEffect, useRef } from "react"
import {
  FileText,
  ArrowUpDown,
  PieChart,
  BuildingIcon as Buildings,
  CreditCard,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const FuncionalidadesPoderosas = () => {
  const location = useLocation()
  const sectionRef = useRef(null)

  useEffect(() => {
    if (location.hash === "#funcionalidades") {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <section ref={sectionRef}  className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 id="funcionalidades" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-[#1B4B96] font-outfit">
          Tudo o que Você Precisa em um Só Lugar
        </h2>
        <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 text-gray-700">
          Simplifique a gestão do seu comércio com ferramentas feitas para quem precisa de resultados reais e rapidez.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {funcionalidades.map((func, index) => (
            <FuncionalidadeCard key={index} {...func} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/funcionalidades"
            className="inline-flex items-center bg-white border-2 border-[#1B4B96] text-[#1B4B96] font-semibold py-3 px-8 rounded-full hover:bg-[#1B4B96] hover:text-white transition duration-300 shadow-md"
          >
            Confira Todas as Funcionalidades
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const FuncionalidadeCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#42B7E9]">
    <div className="flex items-center mb-4">
      <div className="bg-[#1B4B96] p-3 rounded-full mr-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-[#1B4B96]">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
)

const funcionalidades = [
  {
    icon: FileText,
    title: "Emissão de NF-e e SPED",
    description: "Emissão automática de NF-e e geração de SPED para simplificar suas obrigações fiscais.",
  },
  {
    icon: ArrowUpDown,
    title: "Controle de Fluxo",
    description: "Controle total de entradas e saídas para uma gestão financeira precisa e eficiente.",
  },
  {
    icon: PieChart,
    title: "Auditoria e Relatórios",
    description: "Auditoria e relatórios detalhados para tomar decisões baseadas em dados concretos.",
  },
  {
    icon: Buildings,
    title: "Multi-empresa",
    description: "Administre até 100 negócios no mesmo sistema, ideal para redes e franquias.",
  },
  {
    icon: CreditCard,
    title: "Integrações de Pagamento",
    description: "Integrações com máquinas de cartão, Sitef Express e Stone para facilitar as vendas.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança Avançada",
    description: "Proteção de dados e backups automáticos para garantir a segurança das suas informações.",
  },
]

export default FuncionalidadesPoderosas

