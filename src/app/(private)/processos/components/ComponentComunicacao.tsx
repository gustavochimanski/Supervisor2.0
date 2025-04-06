import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Send } from "lucide-react";

const ComponentComunicacao = () => {
  const buttonsItems = [
    {
      title: "Enviar Configuração",
      description: "Envia as configurações aplicadas para a frente de caixa.",
      titleButton: "Enviar"
    },
    {
      title: "Enviar Produtos Geral",
      description: "Realiza o envio completo de todos os produtos para a frente de caixa. Esse processo pode levar alguns minutos.",
      titleButton: "Enviar"
    },
  ];
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {buttonsItems.map((item, index) => (
        <Card key={index} className="flex flex-col justify-between h-64"> {/* altura definida */}
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent /> {/* vazio ou com outro conteúdo se necessário */}
          <CardFooter className="flex justify-center">
            <Button className="flex items-center gap-2">
              {item.titleButton}
              <Send size={16} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ComponentComunicacao;
