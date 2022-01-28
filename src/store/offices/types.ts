export interface IOffice {
    city: string
    code: string
    id: number
    is_warehouse: boolean
    name: string
    warehouse_list: number[]
    warehouses: null
}
export interface IOfficeState {
    isFetching: boolean,
    data: IOffice[],
}
