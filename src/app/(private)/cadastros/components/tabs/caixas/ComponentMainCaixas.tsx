"use client"

import { useState } from "react"
import ComponentConfigCaixas from "./config/ComponentConfigCaixas"
import ComponentPdvs from "./pdvs/ComponentPdvs"

const ComponentMainCaixas = () => {
  const [rowSelected, setRowSelected] = useState<any>()
  return (
    <div className="flex flex-col md:flex-row w-full overflow-auto h-full gap-4">
      
      {/* Seção Caixas */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg text-muted-foreground font-semibold mb-2">Caixas</h2>
        <div className="p-4 md:flex1 md:h-full h-[50vh] shadow rounded-xl border overflow-auto ">
          <ComponentPdvs setRowSelectedProp={setRowSelected} />
        </div>
      </div>
    
      {/* Seção Config */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg text-muted-foreground font-semibold mb-2">Config</h2>
        <div className="p-4 h-full shadow rounded-xl border overflow-auto flex-1">
          <ComponentConfigCaixas data={rowSelected}/>
        </div>
      </div>

    </div>
  )
}

export default ComponentMainCaixas
