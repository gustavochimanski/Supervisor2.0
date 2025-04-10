import React, { useState, useEffect } from "react"
import { Shield, Check, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const SolicitarDemonstracao = () => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    whatsapp: "",
    descricao: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.nome.trim()) errors.nome = "Nome é obrigatório"
    if (!formData.empresa.trim()) errors.empresa = "Nome da empresa é obrigatório"
    if (!formData.email.trim()) errors.email = "E-mail é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "E-mail inválido"
    if (!formData.whatsapp.trim()) errors.whatsapp = "WhatsApp é obrigatório"
    else if (!/^\d{10,11}$/.test(formData.whatsapp.replace(/\D/g, ""))) errors.whatsapp = "WhatsApp inválido"
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length === 0) {
      const message = `Olá! Estou interessado em uma demonstração do ERP Unitec.%0A%0ANome: ${formData.nome}%0AEmpresa: ${formData.empresa}%0AE-mail: ${formData.email}%0AWhatsApp: ${formData.whatsapp}%0ADescrição: ${formData.descricao}`
      window.open(`https://wa.me/5511933787147?text=${message}`, "_blank")
      setIsSubmitted(true)
    } else {
      setErrors(formErrors)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1B4B96] to-[#42B7E9]">
        <header className="bg-white py-4 px-6 flex justify-between items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20(1)-c4UIPctCZQgVIJJPcKs7eA0V5m2iCI.png"
            alt="Unitec Logo"
            className="h-12 w-auto"
          />
          <Link to="/" className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors flex items-center">
            <ArrowLeft className="mr-2" /> Voltar ao Início
          </Link>
        </header>
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-[#1B4B96]">Obrigado!</h2>
            <p className="text-lg text-gray-600">
              Recebemos sua solicitação. Um de nossos especialistas entrará em contato em breve para agendar a
              demonstração.
            </p>
            <a href="/" className="inline-flex items-center text-[#1B4B96] hover:text-[#42B7E9]">
              <ArrowLeft className="mr-2" /> Voltar ao Início
            </a>
          </div>
        </main>
        <footer className="bg-white py-4 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Unitec. Todos os direitos reservados.
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1B4B96] to-[#42B7E9]">
      <header className="bg-white py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-[#1B4B96] hover:text-[#42B7E9] transition-colors flex items-center">
          <ArrowLeft className="mr-2" /> Voltar ao Início
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="text-white text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-6">Transforme Seu Negócio com Nosso ERP</h1>
              <p className="text-xl mb-8 text-white/90">
                Solicite uma demonstração gratuita e descubra como podemos simplificar sua gestão e impulsionar seus
                resultados.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4 inline-block">
                {["Demonstração 100% personalizada", "Suporte especializado", "Aumente sua produtividade"].map(
                  (benefit, index) => (
                    <div key={index} className="flex items-center justify-center lg:justify-start">
                      <Check className="h-5 w-5 text-green-400 mr-3" />
                      <span>{benefit}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">Solicite Sua Demonstração</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#42B7E9] focus:border-[#42B7E9] sm:text-sm"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                </div>
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                    Nome da empresa
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#42B7E9] focus:border-[#42B7E9] sm:text-sm"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                  {errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail corporativo
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#42B7E9] focus:border-[#42B7E9] sm:text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#42B7E9] focus:border-[#42B7E9] sm:text-sm"
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                </div>
                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descreva brevemente seu negócio (opcional)
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#42B7E9] focus:border-[#42B7E9] sm:text-sm"
                    value={formData.descricao}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#1B4B96] to-[#42B7E9] hover:from-[#42B7E9] hover:to-[#1B4B96] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#42B7E9] transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Quero Minha Demonstração
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center mt-6">
                <Shield className="h-5 w-5 text-[#1B4B96] mr-2" />
                <p className="text-xs text-gray-500">Seus dados estão protegidos. Não compartilhamos informações.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white py-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Unitec. Todos os direitos reservados.
      </footer>
    </div>
  )
}

export default SolicitarDemonstracao

