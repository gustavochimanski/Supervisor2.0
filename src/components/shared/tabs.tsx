"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import React from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: React.ReactNode // ✅ aceita string ou JSX
  Component: React.ReactNode // ✅ aceita JSX direto
}

interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  containerClassName?: string
  triggerClassName?: string
  contentClassName?: string
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
      defaultValue={defaultValue || items[0].value}
      className={cn("flex flex-col border border-input", containerClassName)}
    >
      {/* Estilo bonito para o grupo de abas */}
      <TabsPrimitive.List
        className={cn(
          "border-none items-start font-sans bg-muted text-muted-foreground rounded-xl ",
          triggerClassName
        )}
      >
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "hover:bg-background h-9 rounded-t-xl px-4 cursor-pointer text-xs font-bold data-[state=active]:text-primary data-[state=active]:bg-card data-[state=active]:border-b-2 border-none"
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          className={cn(
            "p-4 bg-background ",
            contentClassName
          )}
        >
          {item.Component}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}

export default Tabs
