import { IComboBoxOption } from 'src/interfaces';

export const transportTypes:IComboBoxOption[] = [
    { id: 'TRUCK', label: 'Машина'},
    { id: 'TRAIN', label: 'Поезд'},
];

export type TTransportTypesId = 'TRUCK' | 'TRAIN';