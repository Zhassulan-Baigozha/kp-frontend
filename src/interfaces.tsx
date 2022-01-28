import { IWheel } from './api/CustomAPIModel';
import { IUser } from './store/user/types';

export type TKeyValuePair<T> = {
    [key in string]: T;
};
export type TKeyValuePairString = {
    [key in string]: string;
};

export interface IComboBoxOption {
    label: string
    id: number | string
}

export interface ISignUpUser extends IUser {
    password?: string,
    new_password?: string,
    repeat_password?: string,
}

export interface ISignUpRequest {
    email: string,
    name: string,
    office: number | null,
    password: string,
    position: string,
    repeat_password: string,
    roles: string,
    surname: string,
}

export interface IUpdateUserRole {
    role_name: string,
    user_id: string
}

export type WagonExistanceType = 'find' | 'notFind' | null

export interface IWSListTable {
    axisNum: string,
    axisType: string,
    createdAt: string,
    description: string,
    key: number,
    manufacturerCode: number,
    status: number,
    wagonId: number,
    wheels: IWheel[] | null,
}
