import { PlayerShortResponse } from "../../../types/player"
import api from "@/lib/axios"

export async function getAuthenticatedPlayer(): Promise<PlayerShortResponse> {
  const response = await api.get<PlayerShortResponse>("/authenticated/players/profile", {
    withCredentials: true,
  })

  return response.data
}