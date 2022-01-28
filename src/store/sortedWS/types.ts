import { IGridData } from 'src/api/CustomAPIModel';

export interface ISortedWSState {
    isFetching: boolean,
    data: IGridData[],
}