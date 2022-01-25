import { IGetWSResponse } from "src/api/CustomAPIModel";
import { IWSListTable } from "src/interfaces";

export const convertWs = (wsIn: IGetWSResponse[]):IWSListTable[] => {
  if (wsIn && wsIn.length > 0) {
    return wsIn.map((item, idx) => { 
      let sdf = {
        ...item,
        status: item.status,
        key: item.id,
        axisNum: item.number,
        wagonId: item.wagon,
        axisType: '',
        manufacturerCode: item.manufacturer_code,
        createdAt: item.created_at.substr(0,4),
        description: item.description,
        wheels: item.wheels,
      };
      return sdf;
    })
  } else {
    return []
  }
}