import { PlayerResponse } from "./player"
import { ClassicRecord, PlatformerRecord } from "./record"

enum Difficulty {
  EASY_DEMON = 'Easy demon',
  MEDIUM_DEMON = 'Medium demon',
  HARD_DEMON = 'Hard demon',
  INSANE_DEMON = 'Insane demon',
  EXTREME_DEMON = 'Extreme demon'
}

enum Duration {
  TINY = 'Tiny',
  SHORT = 'Short',
  MEDIUM = 'Medium',
  LONG = 'Long',
  XL = 'XL'
}

export type ClassicLevelResponse = {
    ingameId: string,
    name: string,
    publisher: string,
    difficukty: Difficulty,
    duration: Duration,
    videoLink: string,
    thumbnailLink: string,
    minimumCompletion: number,
    ranking: number,
    points: number,
    minimumPoints: number,
    firstVictor: PlayerResponse,
    records: ClassicRecord[]
}

export type ClassicLevelDTOResponse = {
  id: string,
  ingameId: string,
  name: string
}

export type ClassicLevelQueryResponse = {
  ingameId: string,
  name: string,
  difficulty: Difficulty,
  publisher: string,
  ranking: number
}

export type ClassicLevelCreationRequest = {
  ingameId: string,
  name: string,
  publisher: string,
  difficulty: Difficulty,
  duration: Duration,
  videoLink: string,
  thumbnailLink: string,
  minimumCompletion: number,
  ranking: number
}

export type ClassicLevelUpdateRequest = {
  ingameId: string,
  name: string,
  publisher: string,
  difficulty: Difficulty,
  duration: Duration,
  videoLink: string,
  thumbnailLink: string,
  minimumCompletion: number,
  firstVictor: string
}

export type ClassicLevelShortResponse = {
  id: string,
  name: string
}

export type PlatformerLevelResponse = {
    id: string,
    ingameId: string,
    name: string,
    publisher: string,
    difficukty: Difficulty,
    videoLink: string,
    thumbnailLink: string,
    points: number,
    ranking: number,
    minimumCompletion: number,
    recordHolder: PlayerResponse,
    records: PlatformerRecord[]
}

export type PlatformerLevelDTOResponse = {
  id: string,
  ingameId: string,
  name: string
}

export type PlatformerLevelQueryResponse = {
  ingameId: string,
  name: string,
  difficulty: Difficulty,
  publisher: string,
  ranking: number
}

export type PlatformerLevelCreationRequest = {
  ingameId: string,
  name: string,
  publisher: string,
  difficulty: Difficulty,
  videoLink: string,
  thumbnailLink: string,
  ranking: number
}

export type PlatformerLevelUpdateRequest = {
  ingameId: string,
  name: string,
  publisher: string,
  difficulty: Difficulty,
  videoLink: string,
  thumbnailLink: string,
  minimumCompletion: number,
  recordHolder: string
}

export type PlatformerLevelShortResponse = {
  id: string,
  name: string
}