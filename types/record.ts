import { ClassicLevelDTOResponse, ClassicLevelShortResponse, PlatformerLevelDTOResponse } from "./level"
import { PlayerResponse } from "./player"

export type ClassicRecord = {
    id: string,
    videoLink: string,
    player: PlayerResponse
    level: ClassicLevelShortResponse,
    recordPercentage: number,
    completedAt: Date
}

export type ClassicRecordResponse = {
    player: PlayerResponse
    level: ClassicLevelDTOResponse,
    videoLink: string,
    recordPercentage: number
}

export type ClassicRecordCreationRequest = {
    player: string
    level: string,
    recordPercentage: number,
    videoLink: string
}

export type ClassicRecordUpdateRequest = {
    recordPercentage: number,
    videoLink: string
}

export type PlatformerRecord = {
    id: string,
    videoLink: string,
    player: PlayerResponse
    level: ClassicLevelShortResponse,
    recordTime: string,
    completedAt: Date
}

export type PlatformerRecordResponse = {
    player: PlayerResponse
    level: PlatformerLevelDTOResponse,
    videoLink: string,
    recordPercentage: number
}

export type PlatformerRecordCreationRequest = {
    player: string
    level: string,
    recordTime: string,
    videoLink: string
}

export type PlatformerRecordUpdateRequest = {
    recordTime: string,
    videoLink: string
}