import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = "neutral" | "gray" | "zinc"

type ThemeState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'neutral',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-theme',
    },
  ),
) 