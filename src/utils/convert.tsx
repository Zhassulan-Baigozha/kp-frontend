import { IGetWSResponse } from 'src/api/CustomAPIModel';
import { IWSListTable } from 'src/interfaces';

export const convertWs = (wsIn: IGetWSResponse[]):IWSListTable[] => {
    if (wsIn && wsIn.length > 0) {
        return wsIn.map(item => ({
            ...item,
            status: item.status.name,
            key: item.id,
            axisNum: item.number,
            state: item.state.name,
            manufacturerCode: item.manufacturer_code,
            createdAt: item.created_at.substr(0,4),
            description: item.description,
            wheels: item.wheels,
        }));
    } else {
        return [];
    }
};

export const convertKeyToNumber = (input: React.Key[]):number[] => {
    try{
        return input.map(value=> +value);
    } catch(e) {
        return [];
    }
};