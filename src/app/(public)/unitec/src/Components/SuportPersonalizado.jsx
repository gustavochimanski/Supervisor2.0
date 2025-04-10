// import React from "react"
// import { HeadphonesIcon, Users, Cog, Calendar } from "lucide-react"

// const SuportePersonalizado = () => {
//   return (
//     <section className="py-16 md:py-24 bg-white relative overflow-hidden">
//       {/* Background elements */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-[#1B4B96] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#42B7E9] rounded-full translate-x-1/3 translate-y-1/3"></div>
//         <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#1B4B96] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//       </div>

//       <div className="container mx-auto px-4 md:px-6 relative z-10">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-[#1B4B96] font-outfit">
//           Aqui Você Nunca Está Sozinho
//         </h2>
//         <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 text-gray-700">
//           Ensinamos sua equipe a usar o sistema, configuramos tudo para você e garantimos suporte completo, de domingo a
//           domingo. Enquanto outros oferecem sistemas, nós entregamos parceria.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8">
//             {supportFeatures.map((feature, index) => (
//               <SupportFeature key={index} {...feature} />
//             ))}
//           </div>
//           <div className="relative">
//             <div className="w-full max-w-md aspect-square bg-gradient-to-br from-[#1B4B96] to-[#42B7E9] rounded-full flex items-center justify-center mx-auto">
//               <HeadphonesIcon className="w-1/3 h-1/3 text-white" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// const SupportFeature = ({ icon: Icon, title, description }) => (
//   <div className="flex items-start space-x-4">
//     <div className="flex-shrink-0 p-2 bg-[#42B7E9] bg-opacity-20 rounded-full">
//       <Icon className="w-6 h-6 text-[#1B4B96]" />
//     </div>
//     <div>
//       <h3 className="text-xl font-semibold mb-2 text-[#1B4B96]">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   </div>
// )

// const supportFeatures = [
//   {
//     icon: Users,
//     title: "Treinamento Completo",
//     description: "Capacitamos sua equipe para aproveitar ao máximo todas as funcionalidades do sistema.",
//   },
//   {
//     icon: Cog,
//     title: "Configuração Personalizada",
//     description: "Ajustamos o sistema de acordo com as necessidades específicas do seu negócio.",
//   },
//   {
//     icon: Calendar,
//     title: "Suporte 7 Dias por Semana",
//     description: "Nossa equipe está disponível todos os dias para garantir que você nunca fique sem assistência.",
//   },
// ]

// export default SuportePersonalizado

import React from "react"
import { HeadphonesIcon, Users, Cog, Calendar } from "lucide-react"

const SuportePersonalizado = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#1B4B96] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#42B7E9] rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#1B4B96] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-[#1B4B96] font-outfit">
          Aqui Você Nunca Está Sozinho
        </h2>
        <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 text-gray-700">
          Ensinamos sua equipe a usar o sistema, configuramos tudo para você e garantimos suporte completo, de domingo a
          domingo. Enquanto outros oferecem sistemas, nós entregamos parceria.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {supportFeatures.map((feature, index) => (
              <SupportFeature key={index} {...feature} />
            ))}
          </div>
          <div className="relative">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-[#1B4B96] to-[#42B7E9] rounded-full flex items-center justify-center mx-auto">
              <HeadphonesIcon className="w-1/3 h-1/3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const SupportFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 p-2 bg-[#42B7E9] bg-opacity-20 rounded-full">
      <Icon className="w-6 h-6 text-[#1B4B96]" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2 text-[#1B4B96]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
)

const supportFeatures = [
  {
    icon: Users,
    title: "Treinamento Completo",
    description: "Capacitamos sua equipe para aproveitar ao máximo todas as funcionalidades do sistema.",
  },
  {
    icon: Cog,
    title: "Configuração Personalizada",
    description: "Ajustamos o sistema de acordo com as necessidades específicas do seu negócio.",
  },
  {
    icon: Calendar,
    title: "Suporte 7 Dias por Semana",
    description: "Nossa equipe está disponível todos os dias para garantir que você nunca fique sem assistência.",
  },
]

export default SuportePersonalizado

