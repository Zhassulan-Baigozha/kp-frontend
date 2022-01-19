import { IGetWSResponse, IGridData } from "src/api/CustomAPIModel";
import { IWSListTable } from "src/interfaces";

export default function ConvertWS(wsIn: IGetWSResponse[]):IWSListTable[] {
  if (wsIn && wsIn.length > 0) {
    return wsIn.map((item, idx) => { 
      let sdf = {
        ...item,
        key: item.id,
        axisNum: item.number,
        wagonId: item.wagon,
        axisType: '',
        manufacturerCode: item.manufacturer_code,
        createdAt: item.created_at.substr(0,4),
        description: item.description,
        wheels: item.wheels,
      };
      // if (item.wheels?.length === 1) {
      //   sdf.CKK_1 = item.wheels[0].number ? +item.wheels[0].number : 0;
      //   sdf.rim_1 = item.wheels[0].rim;
      //   sdf.flange_1 = item.wheels[0].flange;
      //   sdf.manufacturer_code_1 = item.wheels[0].manufacturer_code;
      // } else if (item.wheels?.length === 2) {
      //   sdf.CKK_1 = item.wheels[0].number ? +item.wheels[0].number : 0;
      //   sdf.rim_1 = item.wheels[0].rim;
      //   sdf.flange_1 = item.wheels[0].flange;
      //   sdf.manufacturer_code_1 = item.wheels[0].manufacturer_code;

      //   sdf.CKK_2 = item.wheels[1].number ? +item.wheels[0].number : 0;;
      //   sdf.rim_2 = item.wheels[1].rim;
      //   sdf.flange_2 = item.wheels[1].flange;
      //   sdf.manufacturer_code_2 = item.wheels[1].manufacturer_code;
      // }
      
      return sdf;
    })
  } else {
    return []
  }
  
}
