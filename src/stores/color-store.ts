import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Color = "neutral" | "stone" | "zinc" | "gray" | "slate"

type ColorState = {
  color: Color
  setColor: (color: Color) => void
}

export const useColorStore = create<ColorState>()(
  persist(
    (set) => ({
      color: 'neutral',
      setColor: (color) => set({ color }),
    }),
    {
      name: 'ui-color',
    },
  ),
) 