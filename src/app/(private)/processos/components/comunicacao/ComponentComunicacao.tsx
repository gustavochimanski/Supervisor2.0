import { useState } from "react";
import CardInfoButton from "@/components/shared/Card/CardInfoButton";
import { CircleArrowRight, Send } from "lucide-react";
import ModalEnviarConfiguracao from "./ModalEnviarConfiguracoes";
import ModalEnviarProdutos from "./ModalEnviarProdutos";


const ComponentComunicacao = () => {
  const [modalAberto, setModalAberto] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <CardInfoButton
          title="Enviar Configuração"
          description="Envia as configurações aplicadas para a frente de caixa."
          titleButton="Enviar"
          icon={<CircleArrowRight size={16} />}
          onClick={() => setModalAberto("config")}
        />

        <CardInfoButton
          title="Enviar Produtos Geral"
          description="Realiza o envio completo de todos os produtos para a frente de caixa. Esse processo pode levar alguns minutos."
          titleButton="Enviar"
          icon={<CircleArrowRight size={16} />}
          onClick={() => setModalAberto("produtos")}
        />
      </div>

      <ModalEnviarConfiguracao isOpen={modalAberto === "config"} onClose={() => setModalAberto(null)} />
      <ModalEnviarProdutos isOpen={modalAberto === "produtos"} onClose={() => setModalAberto(null)} />
    </>
  );
};

export default ComponentComunicacao;
