export interface IStatusesTable {
    code: number
    description: string
    name: string
    type_status: string
}

export interface IAllStatusesState {
    data: IStatusesTable[],
}