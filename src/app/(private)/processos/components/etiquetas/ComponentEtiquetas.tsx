import TabsWrapper from "@/components/shared/tabsWrapper"
import { User } from "lucide-react"
import ComponentEtiquetasUsuarios from "./usuario/ComponentEtiquetasUsuarios"


const ComponentEtiquetas = () => {
    const nestedTabItems = [
        {
          value: "centralNFCE",
          label: (
            <span className="flex items-center gap-2">
              <User size={14} /> Usuarios
            </span>
          ),
          Component: <ComponentEtiquetasUsuarios/>,
        },
    ]
    return(
        <div className="flex 1 h-full">
            <TabsWrapper items={nestedTabItems}/>
        </div>
    )
}

export default ComponentEtiquetas