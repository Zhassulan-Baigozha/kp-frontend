import { IComboBoxOption } from 'src/interfaces';

export interface ISelectedWSState {
    isFetching: boolean,
    data: IComboBoxOption | null,
}
