import { IComboBoxOption, ITransferList } from 'src/interfaces';
import { IOffice, IRoles, IStatusesTable, ITransport, IUser } from './types';

export interface IActAllOffices { type: 'allOffices/SET', allOffices: IOffice[] }
export interface IActAllUsers { type: 'allUsers/SET', allUsers: IUser[] }
export interface IActAllStatuses { type: 'allStatuses/SET', allStatuses: IStatusesTable[] }
export interface IActAllStates { type: 'allStates/SET', allStates: IComboBoxOption[] }
export interface IActRoles { type: 'roles/SET', roles: IRoles[] }
export interface IActTransfertList { type: 'transferList/SET', transferList: ITransferList[] }
export interface IActTransportList { type: 'transportList/SET', transportList: ITransport[] }
export interface IActUser { type: 'user/SET', user: IUser }
export interface IActWarehouse { type: 'warehouse/SET', warehouse: IComboBoxOption[] }

export type Action 
    = IActAllOffices 
    | IActAllUsers 
    | IActAllStatuses 
    | IActAllStates
    | IActRoles 
    | IActTransfertList
    | IActTransportList 
    | IActUser 
    | IActWarehouse


export const setUserData = (user: IUser): IActUser => {
    return { type: 'user/SET', user };
};

export const setAllUsersList = (allUsers: IUser[]): IActAllUsers => {
    return { type: 'allUsers/SET', allUsers };
};

export const setAllStatusesList = (allStatuses: IStatusesTable[]): IActAllStatuses => {
    return { type: 'allStatuses/SET', allStatuses };
};

export const setAllStatesList = (allStates: IComboBoxOption[]): IActAllStates => {
    return { type: 'allStates/SET', allStates };
};

export const setOfficesList = (allOffices: IOffice[]): IActAllOffices => {
    return { type: 'allOffices/SET', allOffices };
};

export const setRolesList = (roles: IRoles[]): IActRoles => {
    return { type: 'roles/SET', roles };
};

export const setTransportList = (transportList: ITransport[]): IActTransportList => {
    return { type: 'transportList/SET', transportList };
};

export const setTransferList = (transferList: ITransferList[]): IActTransfertList => {
    return { type: 'transferList/SET', transferList };
};

export const setWarehouseList = (warehouse: IComboBoxOption[]): IActWarehouse => {
    return { type: 'warehouse/SET', warehouse };
};

