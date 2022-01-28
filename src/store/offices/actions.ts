import { IOffice } from './types';

export interface ISetAction {
    type: 'offices/SET'
    data: IOffice[],
}

export const setOfficesList = (data: IOffice[]): ISetAction => {
    return { type: 'offices/SET', data };
};