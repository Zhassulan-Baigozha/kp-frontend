import { IRoles } from './types';

export interface ISetAction {
    type: 'roles/SET'
    data: IRoles[],
}

export const setRolesList = (data: IRoles[]): ISetAction => {
    return { type: 'roles/SET', data };
};
