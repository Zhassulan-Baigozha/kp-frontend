import { IComboBoxOption } from 'src/interfaces';

export interface ISetAction {
    type: 'selectedWS/SET'
    data: IComboBoxOption | null,
}
export interface ISetFetcing {
    type: 'selectedWS/SET_FETCHING'
    isFetching: boolean
}

export type Action = ISetAction | ISetFetcing

export const setSelectedWS = (data: IComboBoxOption | null): ISetAction => {
    return { type: 'selectedWS/SET', data };
};

export const isFetching = (isFetching: boolean): ISetFetcing => {
    return { type: 'selectedWS/SET_FETCHING', isFetching };
};
