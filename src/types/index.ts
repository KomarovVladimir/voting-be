export interface MessageData {
    id: number
    roomId: number
    userId: number
    text: string
    postingDate: Date
    lastUpdate: Date
}

export interface RoomData {
    id: number
    userId: number
    name: string
    status: string
    creationDate: Date
    lastUpdate: Date
}

export interface UserData {
    id: number
    email: string
    password: string
    firstName?: string
    lastName?: string
}

export interface VoteData {
    roomId: number
    userId: number
    itemId: number
}

export interface ItemData {
    id: number
    name: string
    roomId: number
    votes: number
}
