"use client"

import ComponentCaixas from "../caixas/ComponentCaixas"
import ComponentPerfilDeCaixa from "../perfisDeCaixa/ComponentPerfisDeCaixa"

const ComponentMainCaixas = () => {
  return (
    <div className="flex flex-col md:flex-row w-full overflow-auto h-full gap-4">
      
      {/* Seção Caixas */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg text-[#666666] font-semibold mb-2">Caixas</h2>
        <div className="p-4 h-full shadow rounded-xl border overflow-auto flex-1">
          <ComponentCaixas />
        </div>
      </div>
      
      {/* Seção Perfil de Caixa */}
      <div className="flex flex-col w-full md:w-[35%]">
        <h2 className="text-lg text-[#666666]  font-semibold mb-2">Perfis de Caixa</h2>
        <div className="p-4 h-full shadow rounded-xl border overflow-auto flex-1">
          <ComponentPerfilDeCaixa />
        </div>
      </div>

    </div>
  )
}

export default ComponentMainCaixas
