export interface IWarehouse {
    id: number,
    name: string,
    code: string,
    office_id: number,
}

export interface IWarehouseState {
    isFetching: boolean,
    data: IWarehouse[],
}
