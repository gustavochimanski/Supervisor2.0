import Tabs from "@/components/shared/tabs"
import TabConfigCaixas from "./tabs/TabConfigCaixas"
import { Settings, Settings2 } from "lucide-react"
import TabConfigSat from "./tabs/TabSat"


const ComponentConfigCaixas = () => {

    const TabItems = [
        {
          value: "caixas",
          label: (
            <span className="flex items-center gap-2">
              <Settings size={15} /> Caixas
            </span>
          ),
          Component: TabConfigCaixas,
        },
        {
          value: "sat",
          label: (
            <span className="flex items-center gap-2">
              <Settings2 size={15} /> Sat
            </span>
          ),
          Component: TabConfigSat,
        },
    ]
    return(
        <div className="flex-1 h-full ">
            <Tabs 
                items={TabItems}
                containerClassName="w-full rounded-sm shadow h-full flex flex-col"
                triggerClassName="transition-colors"
                contentClassName="bg-sidebar rounded-sm flex-1 overflow-auto"            
            />
        </div>
    )
}


export default ComponentConfigCaixas