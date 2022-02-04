import { IComboBoxOption, ITransferList } from 'src/interfaces';

export interface IUser {
    email: string,
    name: string,
    office: number,
    position: string,
    roles: string,
    status: boolean,
    surname: string,
    uuid: string,
}
export interface IStatusesTable {
    code: number
    description: string
    name: string
    type_status: string
}
export interface IOffice {
    city: string
    code: string
    id: number
    is_warehouse: boolean
    name: string
    warehouse_list: number[]
    warehouses: null
}
export interface IRoles {
    id: number,
    label: string,
}
export interface ITransport {  
    is_empty: boolean,
    number: string,
    transport_type: string
}

export interface IUserState {
    allOffices: IOffice[],
    allStatuses: IStatusesTable[],
    allUsers: IUser[],
    roles: IComboBoxOption[],
    transferList: ITransferList[],
    transportList: ITransport[],
    user: IUser,
    warehouse: IComboBoxOption[],
}
