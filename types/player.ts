import { Badge } from "./badge"
import { ClassicRecordResponse, PlatformerRecordResponse } from "./record"
import { RegionPlayerResponse } from "./region"

export type PlayerResponse = {
    id: string,
    username: string,
}

export type PlayerShortResponse = {
  id: string,
  username: string,
  avatar?: string,
  permissions: string[]
}

export type PlayerPointsResponse = {
    id: string,
    username: string,
    classicPoints: number,
    platformerPoints: number
}

export type PlayerProfileResponse = {
    id: string,
    username: string,
    region: RegionPlayerResponse,
    avatar: string,
    classicPoints: number,
    platformerPoints: number,
    badges: Badge[],
    classicRecords: ClassicRecordResponse[],
    platformerRecords: PlatformerRecordResponse[],
    active: boolean,
    flagged: boolean,
    discord: string,
    youtube: string,
    twitter: string,
    twitch: string
}

export type PlayerQueryResponse = {
    id: string,
    username: string,
    classicPoints: number,
    platformerPoints: number
}

export type PlayerUpdateRequest = {
    username: string,
    discord: string,
    youtube: string,
    twitter: string,
    twitch: string
}