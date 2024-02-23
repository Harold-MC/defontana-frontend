export default interface PagedList<T> {
    count: number,
    next?: string,
    previous?: string,
    results: T[]
}