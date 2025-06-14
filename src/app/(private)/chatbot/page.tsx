import TabsWrapper from "@/components/shared/tabs/tabsWrapper"
import { Settings } from "lucide-react"
import TabComponentConfigChatBot from "./components/config/TabComponentConfigChatBot"
import TabComponentBotFlowAdmin from "./components/flow/TabComponentFlowChatBot"


const PageChatBot = () => {

    const nestedTabItems = [
      {
        value: "chatbot-config",
        label: (
          <span className="flex items-center gap-2">
            <Settings size={15} /> Configurações
          </span>
        ),
        Component: <TabComponentConfigChatBot />
        },
      {
        value: "chatbot-fluxo",
        label: (
          <span className="flex items-center gap-2">
            <Settings size={15} /> Fluxo
          </span>
        ),
        Component: <TabComponentBotFlowAdmin />
        },
    ]
    return(
      <div className="flex flex-col h-full min-h-0 p-2">
        <TabsWrapper items={nestedTabItems}/>
      </div>
    )
}


export default PageChatBot