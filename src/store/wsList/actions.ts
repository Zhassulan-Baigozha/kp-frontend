import { IGetWSResponse } from 'src/api/CustomAPIModel';

export interface ISetAction {
    type: 'wsList/SET'
    data: IGetWSResponse[],
}

export const setWSList = (data: IGetWSResponse[]): ISetAction => ({ type: 'wsList/SET', data });
