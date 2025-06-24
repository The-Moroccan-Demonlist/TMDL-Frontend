import { PlayerPointsResponse } from "./player"

export type RegionResponse = {
    name: string
}

export type RegionPlayerResponse = {
    id: string,
    name: string
}

export type RegionQueryResponse = {
    id: string,
    name: string,
    classicPoints: number,
    platformerPoints: number,
    players: PlayerPointsResponse[]
}

export type RegionCreationRequest = {
    name: string
}

export type RegionUpdateRequest = {
    name: string
}