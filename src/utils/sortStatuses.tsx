import { IStatusesTable } from 'src/store/data/types';

export const sortStatuses = (a:IStatusesTable, b:IStatusesTable) => {
    if (a.code < b.code ) return -1;
    if (a.code > b.code ) return 1;
    return 0;
};