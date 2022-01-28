import { IStatusesTable } from './types';

export interface ISetAction {
    type: 'allStatuses/SET'
    data: IStatusesTable[],
}

export const setAllStatusesList = (data: IStatusesTable[]): ISetAction => {
    return { type: 'allStatuses/SET', data };
};
