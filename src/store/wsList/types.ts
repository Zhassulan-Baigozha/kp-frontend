import { IGetWSResponse } from 'src/api/CustomAPIModel';

export interface IWSListState {
    isFetching: boolean,
    data: IGetWSResponse[],
}