import ApiRequest from '../utils/request';
import { AxiosResponse } from 'axios';
import { IUser } from '../store/user/types';

import { IGetRolesItem, IGetWSResponse, ISignInRequest, ISignInResponse } from './CustomAPIModel';
import API from './request';

export const SignIn = (data: ISignInRequest) => API.post<ISignInRequest, AxiosResponse<ISignInResponse>>('api/auth/signin', data).then((r)=>r.data);

export const GetRoles = () => ApiRequest.get<IGetRolesItem[]>('api/role').then((r)=>r.data);
export const GetWS = () => ApiRequest.get<IGetWSResponse[]>('api/v1/ws').then((r)=>r.data);

export const GetUsr = () => ApiRequest.get<IUser>('api/usr').then((r)=>r.data);

