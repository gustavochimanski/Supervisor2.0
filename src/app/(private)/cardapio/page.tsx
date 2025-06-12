import { Apple } from "lucide-react"
import TabsWrapper from "@/components/shared/tabsWrapper"
import TabComponentProdutosCardapio from "./components/produtos/TabComponentProdutosCardapio"
import TabCategorias from "./components/categorias/page"

interface Props {
    
}
const PageCardapio = () => {

    const nestedTabItems = [
    {
      value: "Produtos",
      label: (
        <span className="flex items-center gap-2">
          <Apple size={14} /> Produtos
        </span>
      ),
      Component: <TabComponentProdutosCardapio/>,
    },
    {
      value: "Categorias",
      label: (
        <span className="flex items-center gap-2">
          <Apple size={14} /> Categorias
        </span>
      ),
      Component: <TabCategorias/>,
    }
 ]

    return(
    <div className="flex-1 h-full">
        <TabsWrapper items={nestedTabItems} />
    </div>
    )
}


export default PageCardapio