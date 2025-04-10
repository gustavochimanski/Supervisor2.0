import React from "react"
import Hero from "../Components/Hero"
import ProblemsSection from "../Components/ProblemsSection"
import ComoFazemosDiferenca from "../Components/ComoFazemosDiferença"
import FuncionalidadesPoderosas from "../Components/FuncionalidadesPoderosas"
import TestimonialsSection from "../Components/TestmonialSection"
import NumerosQualidade from "../Components/NumerosQualidade"
import SuportePersonalizado from "../Components/SuportPersonalizado"
import SoliciteDemo from "../Components/SoliciteDemo"
import Footer from "../Components/Footer"

function Home() {
  return (
    <>
      <Hero />
      <ProblemsSection />
      <ComoFazemosDiferenca />
      <FuncionalidadesPoderosas />
      <TestimonialsSection />
      <NumerosQualidade />
      <SuportePersonalizado />
      <SoliciteDemo />
      <Footer />
    </>
  )
}

export default Home

