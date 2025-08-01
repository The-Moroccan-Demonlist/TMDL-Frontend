import { create } from "zustand";
import { PlayerShortResponse } from "../../types/player";

type PlayerStore = {
  player: PlayerShortResponse | null
  setPlayer: (player: PlayerShortResponse) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: null,
  setPlayer: (player => set({player}))
}))
