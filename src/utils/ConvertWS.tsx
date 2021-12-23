
import { IGetWSResponse, IGridData } from "src/api/CustomAPIModel";
import { IStatusesTable } from "src/store/allStatuses/types";

export default function ConvertWS(wsIn: IGetWSResponse[], statusesIn: IStatusesTable[]):IGridData[] {
  if (wsIn && wsIn.length > 0 && statusesIn && statusesIn.length > 0) {
    return wsIn.map((item) => { 

      const status = statusesIn.filter(status => (status.code === item.status)).length === 1
        ? statusesIn.filter(status => (status.code === item.status))[0]
        : null;
      let sdf = {
        id: (+item.id),
        idAxis: (+item.number),
        CKK_1: 0,
        CKK_2: 0,

        rim_1: 0,
        rim_2: 0,

        wagon: item.wagon,
        description: item.description,
        created_at: item.created_at.substr(0,4),
        updated_at: item.updated_at.substr(0,4),
        wheelPairType: status?.type_status ? status?.type_status : '',
        type: status?.name ? status?.name : '',
        
        flange_1: 0,
        flange_2: 0,
        
        manufacturer_code: item.manufacturer_code,
        manufacturer_code_1: 0,
        manufacturer_code_2: 0,
      };

      if (item.wheels?.length === 1) {
        sdf.CKK_1 = item.wheels[0].number ? +item.wheels[0].number : 0;
        sdf.rim_1 = item.wheels[0].rim;
        sdf.flange_1 = item.wheels[0].flange;
        sdf.manufacturer_code_1 = item.wheels[0].manufacturer_code;
      } else if (item.wheels?.length === 2) {
        sdf.CKK_1 = item.wheels[0].number ? +item.wheels[0].number : 0;
        sdf.rim_1 = item.wheels[0].rim;
        sdf.flange_1 = item.wheels[0].flange;
        sdf.manufacturer_code_1 = item.wheels[0].manufacturer_code;

        sdf.CKK_2 = item.wheels[1].number ? +item.wheels[0].number : 0;;
        sdf.rim_2 = item.wheels[1].rim;
        sdf.flange_2 = item.wheels[1].flange;
        sdf.manufacturer_code_2 = item.wheels[1].manufacturer_code;
      }
      
      return sdf;
    })
  } else {
    return []
  }
  
}
