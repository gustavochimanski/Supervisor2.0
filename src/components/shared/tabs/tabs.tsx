"use client"

import { useDraggableScroll } from "@/utils/effects/useDraggableScroll"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import React from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: React.ReactNode
  Component: React.ReactNode
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
  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    moved,
  } = useDraggableScroll()

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue || items[0].value}
      className={cn("flex flex-col h-full w-full border border-input", containerClassName)}
    >
      <TabsPrimitive.List
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className={cn(
          "flex w-full overflow-x-auto flex-nowrap scrollbar-hide bg-muted text-muted-foreground rounded-xl", // 👈 estilos mantidos
          triggerClassName
        )}
        style={{ cursor: moved.current ? "grabbing" : "grab" }}
      >
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "hover:bg-background h-10 rounded-t-xl px-5 text-xs font-bold whitespace-nowrap text-center ", // 👈 mantido
              "data-[state=active]:text-primary data-[state=active]:bg-card data-[state=active]:border-b-2 border-none"
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

    <div className="flex-1 overflow-hidden">
      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          className={cn("h-full w-full overflow-auto p-4 bg-background", contentClassName)}
        >
          {item.Component}
        </TabsPrimitive.Content>
      ))}
    </div>

    </TabsPrimitive.Root>
  )
}

export default Tabs
