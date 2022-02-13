import { IGetWSResponse } from 'src/api/CustomAPIModel';
import { IWSListTable } from 'src/interfaces';

export const convertWs = (wsIn: IGetWSResponse[]):IWSListTable[] => {
    if (wsIn && wsIn.length > 0) {
        return wsIn.map(item => ({
            ...item,
            key: item.id,
            axisNum: item.number,
            state: {
                id: item.state.id,
                label: item.state.name,
            },
            stateName: item.state.name,
            status: {
                id: item.status.code,
                label: item.status.name,
            },
            statusName: item.status.name,
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