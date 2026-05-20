"use client"

import { cn } from "@/lib/utils"

export function ChartContainer({ children, config, className }) {
  const style = {}

  if (config) {
    Object.entries(config).forEach(([key, value]) => {
      style[`--color-${key}`] = value.color
    })
  }

  return (
    <div className={cn("w-full", className)} style={style}>
      {children}
    </div>
  )
}
