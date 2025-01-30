"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaixasComponent from "./MeioPagamento/component";
import ComponentMeioPagamento from "./MeioPagamento/component";
import ComponentCaixas from "./Caixas/component";
import ComponentPerfilDeCaixa from "./PerfisDeCaixa/component";

interface Page {
  nomePage: string;
  value: string;
  Component: React.ComponentType;
}


const pages: Page[] = [
  { nomePage: "Caixas", value: "caixas", Component: ComponentCaixas},
  { nomePage: "Perfil De Caixa", value: "perfil-de-caixa", Component: ComponentPerfilDeCaixa },
  { nomePage: "Meios de Pagamento", value: "meios-de-pagamento", Component: ComponentMeioPagamento },
];



const PageFrenteCaixa = () => {
  
  return (
    <div >
      <Tabs defaultValue={pages[0].value} className="w-[400px] m-2">
        <TabsList>
          {pages.map((pagina) => (
            <TabsTrigger value={pagina.value} key={pagina.value}>
              {pagina.nomePage}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((pagina) => (
          <TabsContent value={pagina.value} key={pagina.value}>
            <h1>{pagina.nomePage}</h1>
            <pagina.Component/>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PageFrenteCaixa;
