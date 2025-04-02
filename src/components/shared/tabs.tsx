"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";

interface TabItem {
  value: string;
  label: React.ReactNode; // ✅ aceita string ou JSX
  Component: React.FC<any>;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  containerClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}


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
