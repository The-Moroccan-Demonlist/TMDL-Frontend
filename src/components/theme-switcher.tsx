"use client"

import * as React from "react"
import { Paintbrush } from "lucide-react"
import { useThemeStore } from "@/stores/theme-store"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { setTheme } = useThemeStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Paintbrush className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("gray")}>
          Gray
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("neutral")}>
          Neutral
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("zinc")}>
          Zinc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 