import { IGridData } from 'src/api/CustomAPIModel';

export interface ISetAction {
    type: 'sortedWS/SET'
    data: IGridData[],
}

export const setSortedWSList = (data: IGridData[]): ISetAction => {
    return { type: 'sortedWS/SET', data };
};
