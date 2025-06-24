import { Player } from "./player"

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

export type ClassicLevel = {
    id: string,
    ingameId: string,
    name: string,
    publisher: string,
    difficukty: Difficulty,
    duration: Duration,
    videoLink: string,
    thumbnailLink: string,
    points: number,
    minimumPoints: number,
    ranking: number,
    minimumCompletion: number,
    firstVictor: Player,
    records: Record[]
}

export type PlatformerLevel = {
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
    recordHolder: Player,
    records: PlatformerRecord[]
}