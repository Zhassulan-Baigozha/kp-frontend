import axios, { AxiosResponse } from 'axios';
import { IOffice, IUser } from 'src/store/data/types';
import { 
    IAddWSFromWagonRequest,
    IAppendPurchasedRequest, 
    IAuthReNew, 
    IGetRepairWSResponse, 
    IGetRolesItem, 
    IGetTransfersByWh_id, 
    IGetWagonByIdResponse, 
    IGetWSResponse, 
    IRepairWSChangeStatusRequest, 
    IRepairWSUpdateRequest, 
    ISignInRequest, 
    ISignInResponse, 
    IUpdatePassword, 
    IUpdateUserFieldsRequest, 
    IWarehouse,
    IGetTransferByDestResponse,
    ICreateTransfer,
    IInstallWSToWagonRequest,
    IParseWSRequest,
    IGetWheelsResponse,
    IGetWSHistoryResponse,
    IGetStatesResponse
} from './CustomAPIModel';
import { ITransport, IStatusesTable } from 'src/store/data/types';
import { ISignUpRequest, ISignUpUser, IUpdateUserRole } from 'src/interfaces';


export const CustomAxios2 = (auth_user_token: string) =>{
    const instance = axios.create({
        baseURL: 'https://api.kp.itmd.kz/',
        timeout: 1000,
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: auth_user_token,
        }
    });
    return instance;
};

export const UpdatePassword = (token: string, data: IUpdatePassword) => CustomAxios2(token)
    .put<IUpdatePassword>('api/usr', data).then((r)=>r.data);
export const UpdateUserRole = (token: string, data: IUpdateUserRole) => CustomAxios2(token)
    .put<IUpdateUserRole>('api/role', data).then((r)=>r.data);
export const UpdateUserData = (token: string, data: IUpdateUserFieldsRequest) => CustomAxios2(token)
    .post<IUpdateUserFieldsRequest, AxiosResponse<ISignInResponse>>('api/usr', data).then((r)=>r.data);
export const SignUp = (token: string, data: ISignUpRequest) => CustomAxios2(token)
    .post<ISignUpUser, AxiosResponse<ISignInResponse>>('api/auth/signup', data).then((r)=>r.data);
export const GetUsr = (token: string) => CustomAxios2(token)
    .get<IUser>('api/usr').then((r)=>r.data);
export const GetRoles = (token: string) => CustomAxios2(token)
    .get<IGetRolesItem[]>('api/role').then((r)=>r.data);
export const GetWS = (token: string) => CustomAxios2(token)
    .get<IGetWSResponse[]>('api/v1/ws').then((r)=>r.data);
export const GetAllUsr = (token: string) => CustomAxios2(token)
    .get<IUser[]>('api/usr/all').then((r)=>r.data);
export const GetOffices = (token: string) => CustomAxios2(token)
    .get<IOffice[]>('api/v1/office').then((r)=>r.data);
export const GetWarehouse = (token: string) => CustomAxios2(token)
    .get<IWarehouse[]>('api/v1/warehouse').then((r)=>r.data);
export const GetStatuses = (token: string) => CustomAxios2(token)
    .get<IStatusesTable[]>('api/v1/repair/status').then((r)=>r.data);
export const GetWagonByWarehouse = (token: string, wh_id: number) => CustomAxios2(token)
    .get<IStatusesTable[]>(`api/v1/repair/wagon/${wh_id}`).then((r)=>r.data);
export const AuthReNew = (token: string, data: IAuthReNew) => CustomAxios2(token)
    .put<IAuthReNew, AxiosResponse<ISignInResponse>>('api/auth/renew', data).then((r)=>r.data);
export const SignIn = (token: string, data: ISignInRequest) => CustomAxios2(token)
    .post<ISignInRequest, AxiosResponse<ISignInResponse>>('api/auth/signin', data).then((r)=>r.data);

export const GetWagonById = (token: string, num: string) => CustomAxios2(token)
    .get<IGetWagonByIdResponse>(`api/v1/wagon/${num}`).then((r)=>r.data);

export const AppendPurchased = (token: string, data: IAppendPurchasedRequest) => CustomAxios2(token)
    .post<IAppendPurchasedRequest, AxiosResponse<ISignInResponse>>('api/v1/repair/append-purchased', data).then((r)=>r.data);
export const InstallWSToWagon = (token: string, data: IInstallWSToWagonRequest) => CustomAxios2(token)
    .post<IInstallWSToWagonRequest, AxiosResponse>('api/v1/repair/installation-wheelset', data).then((r)=>r.data);
export const RepairWSChangeStatus = (token: string, data: IRepairWSChangeStatusRequest) => CustomAxios2(token).post<IRepairWSChangeStatusRequest>('api/v1/repair/ws/', data).then((r)=>r.data);
export const RepairWSUpdate = (token: string, data: IRepairWSUpdateRequest) => CustomAxios2(token)
    .put<IRepairWSUpdateRequest>('api/v1/repair/ws/', data).then((r)=>r.data);
export const AddWSFromWagon = (token: string, data: IAddWSFromWagonRequest) => CustomAxios2(token)
    .post<IAddWSFromWagonRequest>('api/v1/repair/append-wagon/', data).then((r)=>r.data);
export const GetTransportList = (token: string) => CustomAxios2(token)
    .get<ITransport[]>('api/v1/transfer-transport').then((r)=>r.data);
export const GetTransfersByWh_id = (token: string, wh_id: string) => CustomAxios2(token)
    .get<IGetTransfersByWh_id[]>(`api/v1/transfer-stock/${wh_id}`).then((r)=>r.data);
export const GetWSByWarehouse = (token: string, wh_id: number | string) => CustomAxios2(token)
    .get<IGetRepairWSResponse[]>(`api/v1/repair/ws/${wh_id}`).then((r)=>r.data);
export const GetWarehouseByStoreId = (token: string, storeId: string) => CustomAxios2(token)
    .get<IGetWSResponse[]>(`api/v1/ws-warehouse/${storeId}`).then((r)=>r.data);
    
//Transfer
export const GetTransferByDestination = (token: string, wh_id: number | string) => CustomAxios2(token)
    .get<IGetTransferByDestResponse[]>(`api/v1/transfer-delivery/${wh_id}`).then((r)=>r.data);
export const GetTransferByDeparture = (token: string, wh_id: number | string) => CustomAxios2(token)
    .get<IGetTransferByDestResponse[]>(`api/v1/transfer-stock/${wh_id}`).then((r)=>r.data);
export const SendTransfer = (token: string, transfer_id: number | string) => CustomAxios2(token)
    .get<IGetTransferByDestResponse[]>(`api/v1/transfer-send/${transfer_id}`).then((r)=>r.data);
export const CreateTransfer = (token: string, data: ICreateTransfer) => CustomAxios2(token)
    .post<ICreateTransfer, AxiosResponse<ISignInResponse>>('api/v1/transfer/new', data).then((r)=>r.data);
export const AddWSToTransfer = (token: string, transfer_id: number | string, wsId: number | string) => CustomAxios2(token)
    .get<IGetTransferByDestResponse[]>(`api/v1/transfer-add/${transfer_id}/${wsId}`).then((r)=>r.data);
export const DeleteWSToTransfer = (token: string, transfer_id: number | string, wsId: number | string) => CustomAxios2(token)
    .get<IGetTransferByDestResponse[]>(`api/v1/transfer-remove/${transfer_id}/${wsId}`).then((r)=>r.data);
export const CompleteWSToTransfer = (token: string, transfer_id: number | string) => CustomAxios2(token)
    .get<IGetTransferByDestResponse[]>(`api/v1/transfer-complete/${transfer_id}`).then((r)=>r.data);

// Craft 
export const GetWheels = (token: string, wh_id: number | string) => CustomAxios2(token)
    .get<IGetWheelsResponse[]>(`api/v1/repair/wheel/${wh_id}`).then((r)=>r.data);
export const ParseWS = (token: string, data: IParseWSRequest) => CustomAxios2(token)
    .put<IParseWSRequest>('api/v1/repair/parsing/', data).then((r)=>r.data);
export const CraftWS = (token: string, data: IParseWSRequest) => CustomAxios2(token)
    .post<IParseWSRequest>('api/v1/repair/making/', data).then((r)=>r.data);
export const GetWSHistory = (token: string, wh_id: number | string) => CustomAxios2(token)
    .get<IGetWSHistoryResponse[]>(`api/v1/repair/history-ws/${wh_id}`).then((r)=>r.data);
export const GetStates = (token: string) => CustomAxios2(token)
    .get<IGetStatesResponse[]>('api/v1/repair/stock-state/').then((r)=>r.data);