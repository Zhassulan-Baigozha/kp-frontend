import React, { useEffect, useState } from 'react';
import BackgroundPaper from '../layout/BackgroundPaper';
import { IGridData } from '../api/CustomAPIModel';
import { OutlinedButton } from '../components/BaseComponents/CustomButtons';
import { AddIco, InstallIco, RelocationIco, RepairIco } from '../assets/svg';
import { ADD_ACTION, INSTALL_ACTION, RELOCATION_ACTION, REPAIR_ACTION, SIGN_IN_ACTION, WAREHOUSE_ACTION } from '../constants/pages';
import DataTable1 from '../components/DataTable1';

// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';


interface IWarehousePage {
  switchPage: (value: string) => void
}

const WarehousePage: React.FC<IWarehousePage> = ({
  switchPage,
}) => {
  const [ws, setWS] = useState<IGridData[]>([]);
  // useEffect(() => {
    // SignIn({
    //   'email': 'marat.ggg@gmail.com',
    //   'password': 'string'
    // }).then((r: ISignInResponse) => {
    //   cookieSetToken('auth_user_token', 'Bearer ' + r.access_token);
    // });

  //   GetWS().then((res) => {
  //     console.log('GetWS ws = ', res);
  //     setWS(res.map((item) => { 
  //       return {
  //         id: item.id,
  //         wagon: item.wagon,
  //         rimLeft: item.wheel_left.rim,
  //         rimRight: item.wheel_right.rim,
  //         flangeLeft: item.wheel_left.flange,
  //         flangeRight: item.wheel_right.flange,
  //         created_at: item.created_at.substr(0,4),
  //         updated_at: item.updated_at.substr(0,4),
  //         manufacturer_code: 
  //           item.wheel_left.manufacturer_code + '-' + 
  //           item.axis.manufacturer_code + '-' + 
  //           item.wheel_right.manufacturer_code,
  //         wheelPairNum: 
  //           item.wheel_left.id + '-' + 
  //           item.axis.id + '-' + 
  //           item.wheel_right.id,
  //       };
  //     }));
  //   }).catch((err) => {
  //     console.log(err);
  //     switchPage(SIGN_IN_ACTION);
  //   });
  // },[]);

  return (
    <BackgroundPaper>
      <div style={{marginBottom: '32px', textAlign: 'right'}}>
        <div style={{marginRight: '16px', display: 'inline-block'}}>
          <OutlinedButton onClick={()=>{switchPage(ADD_ACTION);}}>
            <AddIco />
            <span style={{ marginLeft: '8px' }}> Добавить </span>
          </OutlinedButton>
        </div>

        <div style={{marginRight: '16px', display: 'inline-block'}}>
          <OutlinedButton onClick={()=>{switchPage(REPAIR_ACTION);}}>
            <RepairIco />
            <span style={{ marginLeft: '8px' }}>Ремонт</span>
          </OutlinedButton>
        </div>

        <div style={{marginRight: '16px', display: 'inline-block'}}>
          <OutlinedButton onClick={()=>{switchPage(INSTALL_ACTION);}}>
            <InstallIco />
            <span style={{ marginLeft: '8px' }}>Установить</span>
          </OutlinedButton>
        </div>

        <div style={{marginRight: '16px', display: 'inline-block'}}>
          <OutlinedButton onClick={()=>{switchPage(RELOCATION_ACTION);}}>
            <RelocationIco />
            <span style={{ marginLeft: '8px' }}>Перемещение</span>
          </OutlinedButton>
        </div>
      </div>
      <DataTable1 ws={ws}/>
    </BackgroundPaper>
  );
};

export default WarehousePage;