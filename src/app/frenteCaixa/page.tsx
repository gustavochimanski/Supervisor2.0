import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const pages = [
      {nomePage: "Enviar Configuração", value: "enviar-configuracao"},
      {nomePage: "Caixas", value: "caixas"},
      {nomePage: "Meios de Pagamento", value: "meios-de-pagamento"},
      {nomePage: "Processar caixa", value: "processar-caixa"},
]

  const PageFrenteCaixa = () => {
    return (
      <div className="dark">
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
                <h1>Conteúdo para a página {pagina.nomePage}</h1>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  };
  
  export default PageFrenteCaixa;
  