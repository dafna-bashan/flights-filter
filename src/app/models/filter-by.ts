export interface FilterBy {
    origin: string,
    destination: string,
    minPrice: number,
    maxPrice: number,
    connections: string,
    fromDate: Date | string | number,
    toDate: Date | string | number,
    sortBy: string
}
