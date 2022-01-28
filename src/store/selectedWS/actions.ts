import { IComboBoxOption } from 'src/interfaces';

export interface ISetAction {
    type: 'selectedWS/SET'
    data: IComboBoxOption | null,
}

export const setSelectedWS = (data: IComboBoxOption | null): ISetAction => {
    return { type: 'selectedWS/SET', data };
};