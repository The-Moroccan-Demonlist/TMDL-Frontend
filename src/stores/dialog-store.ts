import { create } from 'zustand'

type DialogStore = {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export const useDialogStore = create<DialogStore>((set) => ({
  dialogOpen: false,
  setDialogOpen: (open) => set({ dialogOpen: open }),
}))
