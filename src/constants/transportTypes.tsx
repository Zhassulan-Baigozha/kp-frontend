import { IComboBoxOption } from 'src/interfaces';

export const transportTypes:IComboBoxOption[] = [
    { id: 'TRUCK', label: 'Машина'},
    { id: 'TRAIN', label: 'Вагон'},
];

export type TTransportTypesId = 'TRUCK' | 'TRAIN';