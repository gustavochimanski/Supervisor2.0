import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  DollarSign,
  Package,
  ShoppingCart,
  Building,
  FileText,
  PieChart,
  Shield,
  CreditCard,
  HeadphonesIcon,
} from "lucide-react"

const FeatureItem = ({ icon: Icon, title, description }) => (
  <motion.div
    className="flex flex-col md:flex-row items-start gap-4 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-20"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex-shrink-0">
      <Icon className="w-8 h-8 text-[#42B7E9]" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white text-opacity-80">{description}</p>
    </div>
  </motion.div>
)

const TodasFuncionalidades = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const features = [
    {
      icon: DollarSign,
      title: "Gestão Financeira Completa",
      description:
        "Controle de fluxo de caixa, contas contábeis e conciliações automáticas. Nunca perca de vista suas finanças.",
    },
    {
      icon: Package,
      title: "Controle de Estoque Inteligente",
      description:
        "Administre validade, entradas e saídas de produtos com relatórios detalhados. Evite perdas e otimize seu inventário.",
    },
    {
      icon: ShoppingCart,
      title: "PDV Ágil e Confiável",
      description:
        "Alta velocidade no atendimento, estabilidade e funcionalidades avançadas como fechamento seguro e sangrias.",
    },
    {
      icon: Building,
      title: "Multi-Loja e Multi-Empresa",
      description:
        "Controle até 100 empresas ou setores em um único sistema, com integração total e relatórios unificados.",
    },
    {
      icon: FileText,
      title: "Emissão Automática de NF-e",
      description: "Geração de notas fiscais e SPED sem complicações, diretamente pela plataforma.",
    },
    {
      icon: PieChart,
      title: "Relatórios e Auditoria",
      description:
        "Filtros avançados para gerar relatórios personalizados e exportar dados para dashboards ou planilhas.",
    },
    {
      icon: Shield,
      title: "Segurança Máxima",
      description: "Plataforma Linux que elimina custos com licenças e oferece estabilidade incomparável.",
    },
    {
      icon: CreditCard,
      title: "Integrações Práticas",
      description:
        "Compatível com máquinas de cartão como Stone, Sitef Express e muito mais, para facilitar suas vendas.",
    },
    {
      icon: HeadphonesIcon,
      title: "Suporte Personalizado",
      description:
        "Atendimento completo, todos os dias, até as 22h. Garantimos que o sistema esteja 100% funcional e ensinamos sua equipe a usá-lo.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#1B4B96] to-[#42B7E9]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
          Todas as Funcionalidades Que Seu Negócio Precisa
        </h2>
        <p className="text-xl text-center text-white mb-12 max-w-3xl mx-auto">
          Nosso ERP vai além do básico. Ele é a solução completa que oferece agilidade, precisão e controle para o
          varejo. Confira as funcionalidades que fazem a diferença no seu dia a dia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/solicitar-demonstracao"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#1B4B96] bg-white hover:bg-opacity-90 transition duration-300"
          >
            Solicite uma demonstração
            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TodasFuncionalidades

