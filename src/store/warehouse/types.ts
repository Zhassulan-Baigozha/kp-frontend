import { IComboBoxOption } from 'src/interfaces';

export interface IWarehouseState {
    isFetching: boolean,
    data: IComboBoxOption[],
}
