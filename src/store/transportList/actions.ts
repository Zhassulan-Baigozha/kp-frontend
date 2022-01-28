import { ITransport } from './types';

export interface ISetAction {
    type: 'transportList/SET'
    data: ITransport[],
}

export const setTransportList = (data: ITransport[]): ISetAction => {
    return { type: 'transportList/SET', data };
};

