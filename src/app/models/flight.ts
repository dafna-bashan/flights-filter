export interface Flight {
    id?: string,
    departure: number,
    landing: number,
    origin: string,
    destination: string,
    price?: number,
    connections?: Flight[]
}