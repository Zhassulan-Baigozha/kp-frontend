import { IOffice } from './types';

export interface ISetAction {
    type: 'offices/SET'
    data: IOffice[],
}
export interface ISetFetcing {
    type: 'offices/SET_FETCHING'
    isFetching: boolean
}

export interface IReset {
    type: 'offices/RESET',
}

export interface IToggleVisibility {
    type: 'offices/TOGGLE_VISIBILITY'
    show: boolean
}

export type Action = ISetAction | ISetFetcing | IReset | IToggleVisibility

export const setOfficesList = (data: IOffice[]): ISetAction => {
    return { type: 'offices/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
    return { type: 'offices/SET_FETCHING', isFetching };
};

export const resetFilter = (): IReset => {
    return { type: 'offices/RESET' };
};