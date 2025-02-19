"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";

/**
 * Interface que representa um item de aba.
 * @property {string} value - Valor único que identifica a aba.
 * @property {string} label - Rótulo exibido na aba.
 * @property {React.ComponentType} Component - Componente que será renderizado quando a aba estiver ativa.
 */
export interface TabItem {
  value: string;
  label: string;
  Component: React.ComponentType;
}

/**
 * Propriedades esperadas pelo componente Tabs.
 * @property {TabItem[]} items - Lista de itens (abas) a serem renderizadas.
 * @property {string} [defaultValue] - Valor da aba que deve estar ativa por padrão.
 * @property {string} [containerClassName] - Classe CSS para estilizar o container principal das abas.
 * @property {string} [triggerClassName] - Classe CSS para estilizar cada botão (gatilho) das abas.
 * @property {string} [contentClassName] - Classe CSS para estilizar o conteúdo de cada aba.
 */
interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  containerClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

/**
 * Componente Tabs que renderiza uma interface de abas utilizando o Radix UI.
 *
 * @param {TabsProps} props - Propriedades do componente.
 * @returns {JSX.Element} Elemento JSX representando o componente de abas.
 *
 * @example
 * const tabItems = [
 *   { value: "home", label: "Home", Component: HomeComponent },
 *   { value: "profile", label: "Perfil", Component: ProfileComponent }
 * ];
 *
 * <Tabs items={tabItems} defaultValue="home" />
 */
const Tabs: React.FC<TabsProps> = ({
  items,
  defaultValue,
  containerClassName,
  triggerClassName,
  contentClassName,
}) => {
  return (
    <TabsPrimitive.Root
      // Define o valor padrão da aba ativa. Se defaultValue não for informado, utiliza o primeiro item da lista.
      defaultValue={defaultValue || items[0].value}
      className={containerClassName}
    >
      {/* Lista de gatilhos/abas */}
      <TabsPrimitive.List className="flex font-sans rounded-xl">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            // Estilização básica do trigger, com possibilidade de customização via triggerClassName
            className={` rounded-t-xl bg-slate-100 px-4 py-2 cursor-pointer text-xs font-bold data-[state=active]:text-sidebar-accent-foreground data-[state=active]:bg-card text-slate-400 hover:bg-gray-200 data-[state=active]:border-b-2 border-none ${
              triggerClassName || ""
            }`}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {/* Conteúdo de cada aba */}
      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          // Estilização básica do conteúdo, com possibilidade de customização via contentClassName
          className={`p-3 ${contentClassName || ""}`}
        >
          {/* Renderiza o componente associado à aba */}
          <item.Component />
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
};

export default Tabs;
