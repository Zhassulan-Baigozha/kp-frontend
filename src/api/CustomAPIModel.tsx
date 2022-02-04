import { TTransportTypesId } from 'src/constants/transportTypes';
import { ITransport } from 'src/store/data/types';


export interface ISignInResponse { 
    access_token: string,
    refresh: string,
}
export interface ISignInRequest { 
    email: string,
    password: string,
}

export interface IGetRolesItem {
    id: number,
    name: string,
    display_name: string,
    description: string,
}
export interface IWheel {
    flange: number,
    rim: number,
    manufacturer_code: number,
    year_issue: number,
    date_survey: string,
    number: string,
    created_at?: string,
    id?: number,
    status?: number,
}
export interface IGetWSResponse {
    number: string,
    date_survey: string,
    manufacturer_code: number,
    description: string,
    status: number,
    warehouse_id: number,
    wagon: number,
    created_at: string,
    id: number,
    updated_at: string,
    user_id: string,
    wheels: IWheel[]
}

export interface IGetRepairWSResponse {
    arrival_date: string
    departure_date: string
    description: string
    repairs_id: number
    state: {id: number, name: string}
    id: number
    name: string
    user_id: string
    warehouse_id: number
    wheelset:IGetWSResponse
}
export interface IGridData {
    id: number,
    CKK_1?: number,
    CKK_2?: number,
    idAxis?: number,
    wagon?: number,
    created_at?: string,
    updated_at?: string,
    wheelPairType: string,
    type?: string,
    rim_1?: number,
    rim_2?: number,
    flange_1?: number,
    flange_2?: number,
    manufacturer_code?: number,
}
export interface IUpdatePassword {
    new_password: string,
    repeat_password: string,
    uuid?: string
}

export interface IAuthReNew {
    refresh_token: string,
}

export interface IUpdateUserFieldsRequest {
    email: string,
    name: string,
    office: number | null,
    position: string,
    status: boolean,
    surname: string,
    uuid: string
}

export interface IGetWagonByIdResponse {
    owner_company: number
    owner_country: number
    state: {
        id: number
        name: string
    }
    wagon_id: number
    wagon_type: string
    wheel_set_first: IGetWSResponse
    wheel_set_second: IGetWSResponse
    wheel_set_third: IGetWSResponse
    wheel_set_fourth: IGetWSResponse
}

export interface IAppendPurchasedForm {
    date_survey: string,
    description: string,
    manufacturer_code: number,
    number: string,
    status: number,
    warehouse_id: number,
    year_issue: number,
    wheel_left_date_survey?: string,
    wheel_left_flange?: number,
    wheel_left_manufacturer_code?: number,
    wheel_left_number?: string,
    wheel_left_rim?: number,
    wheel_left_status?: number,
    wheel_left_year_issue?: number
    wheel_right_date_survey?: string,
    wheel_right_flange?: number,
    wheel_right_manufacturer_code?: number,
    wheel_right_number?: string,
    wheel_right_rim?: number,
    wheel_right_status?: number,
    wheel_right_year_issue?: number
}

export interface IAppendPurchasedRequest extends IAppendPurchasedForm{
    wheels: IWheel[],
}

export interface IRepairWSChangeStatusRequest {
    description: string,
    state_id: number,
    status_id: number,
    wheelset_id: number,
}

export interface IRepairWSUpdateRequest {
    description: string,
    id: number,
    status_id: number,
    updated_at: string,
    wagon: number | null,
    wheels: IRepairWSUpdateRequestWheels[]
}
export interface IRepairWSUpdateRequestWheels {
    date_survey: string,
    flange: number,
    id: number,
    rim: number,
    status: number,
    wheelset_id: number,
}

export interface IAddWSFromWagonRequest {
    description: string,
    wagon_id: number,
    warehouse_id: number,
    ws_list: number[]
}

export interface IWarehouse {
    id: number, 
    code: string, 
    name: string, 
    office_id: number
}

export interface IGetTransfersByWh_id {
    delivery_date: string
    departure: IWarehouse,
    destination:IWarehouse,
    id: number,
    send_date: string,
    start_date: string,
    state: {
        id: number, 
        name: string,
    },
    transport: ITransport,
    user_id: string,
    wheelsets: IRepairWSUpdateRequestWheels[],
}

export interface IGetTransferByDestResponse {
    departure: {
        name: string
    }, 
    destination: {
        name: string
    }, 
    id: number,
    transport: {
        transport_type: TTransportTypesId,
        number: string,
    },
    state:{
        name: string,
    },
    product: {wheel_set: IGetWSResponse}[]
}

export interface ICreateTransfer {
    departure_id: number,
    destination_id: number,
    transport_number: string
}