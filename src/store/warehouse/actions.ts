import { IComboBoxOption } from 'src/interfaces';

export interface ISetAction {
    type: 'warehouse/SET'
    data: IComboBoxOption[],
}

export const setWarehouseList = (data: IComboBoxOption[]): ISetAction => {
    return { type: 'warehouse/SET', data };
};
