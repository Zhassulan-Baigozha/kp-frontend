import { IUser } from '../user/types';

export interface IAllUsersState {
    isFetching: boolean,
    data: IUser[],
}