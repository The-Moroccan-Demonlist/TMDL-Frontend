export type Badge = {
    id: string,
    name: string,
    description: string,
    order: number,
    hexCode: string
}

export type BadgeResponse = {
    id: string,
    name: string,
    description: string,
    hexCode: string
}

export type BadgeCreationRequest = {
    name: string,
    description: string,
    hexCode: string
}

export type BadgeUpdateRequest = {
    name: string,
    description: string,
    hexCode: string
}

export type BadgeReorderRequest = {
    id: string,
    order: number
}