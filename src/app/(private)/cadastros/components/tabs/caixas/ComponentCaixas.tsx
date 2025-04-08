"use client"

import ComponentCaixas from "./pdvs/ComponentPdvs"
import ComponentPerfilDeCaixa from "../perfisDeCaixa/ComponentPerfisDeCaixa"
import ComponentConfigCaixas from "./config/ComponentConfigCaixas"

const ComponentMainCaixas = () => {
  return (
    <div className="flex flex-col md:flex-row w-full overflow-auto h-full gap-4">
      
      {/* Seção Caixas */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg text-muted-foreground font-semibold mb-2">Caixas</h2>
        <div className="p-4 h-full shadow rounded-xl border overflow-auto flex-1">
          <ComponentCaixas />
        </div>
      </div>
    
      {/* Seção Config */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg text-muted-foreground font-semibold mb-2">Config</h2>
        <div className="p-4 h-full shadow rounded-xl border overflow-auto flex-1">
          <ComponentConfigCaixas />
        </div>
      </div>

    </div>
  )
}

export default ComponentMainCaixas
