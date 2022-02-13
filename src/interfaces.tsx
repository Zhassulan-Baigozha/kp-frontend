import { IGetWSResponse, IWheel, IWheelFromGetWheelsResponse } from './api/CustomAPIModel';
import { IUser } from './store/data/types';

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
    stateName: string,
    state: IComboBoxOption,
    createdAt: string,
    description: string,
    key: number,
    manufacturerCode: number,
    statusName: string,
    status: IComboBoxOption,
    wheels: IWheel[] | null,
}
export interface ITransferList {
    key: string,
    departure: string,
    destination: string,
    transport: string,
    transportType: string,
    wheelSet: IGetWSResponse[]
}
export interface IWheelsListTable {
    wheelId: string,
    manufacturerCode: number,
    yearIssue: number,
    CKKNumber: string,
    rim: number,
    flange: number,
    key: number,
    wheels: IWheelFromGetWheelsResponse,
    dateSurvey: string,
    stateId: number,
    statusId: number,
}