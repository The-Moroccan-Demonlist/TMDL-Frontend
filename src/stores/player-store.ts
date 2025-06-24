import { create } from "zustand";

interface Player {
  id: string
  username: string
  avatar?: string
}

interface PlayerStore {
  profile: Player | null
  setProfile: (profile: Player) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  profile: null,
  setProfile: (profile => set({profile}))
}))
