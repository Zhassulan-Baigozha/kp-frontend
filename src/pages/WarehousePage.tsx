import React from 'react';
import { ADD_ACTION, INSTALL_ACTION, RELOCATION_ACTION, REPAIR_ACTION } from '../layout/pages';
import { IPages } from 'src/interfaces';
import { IRootState } from 'src/store';
import { useSelector } from 'react-redux';
// import BackgroundPaper from '../layout/BackgroundPaper';
// import WSTable from 'src/components/WSTable';
// import { OutlinedButton } from 'src/components/CustomButtons';
// import { AddIco, InstallIco, RelocationIco, RepairIco } from '../assets/svg';

const WarehousePage: React.FC<IPages> = ({
  switchPage,
}) => {
  const sortedWS = useSelector((state: IRootState) => state.sortedWS.data);
  return (
    <div>
      WarehousePage
    </div>
    // <BackgroundPaper>
    //   <div style={{marginBottom: '32px', textAlign: 'right'}}>
    //     <div style={{marginRight: '16px', display: 'inline-block'}}>
    //       <OutlinedButton onClick={()=>{switchPage(ADD_ACTION);}}>
    //         <AddIco />
    //         <span style={{ marginLeft: '8px' }}> Добавить </span>
    //       </OutlinedButton>
    //     </div>

    //     <div style={{marginRight: '16px', display: 'inline-block'}}>
    //       <OutlinedButton onClick={()=>{switchPage(REPAIR_ACTION);}}>
    //         <RepairIco />
    //         <span style={{ marginLeft: '8px' }}>Ремонт</span>
    //       </OutlinedButton>
    //     </div>

    //     <div style={{marginRight: '16px', display: 'inline-block'}}>
    //       <OutlinedButton onClick={()=>{switchPage(INSTALL_ACTION);}}>
    //         <InstallIco />
    //         <span style={{ marginLeft: '8px' }}>Установить</span>
    //       </OutlinedButton>
    //     </div>

    //     <div style={{marginRight: '16px', display: 'inline-block'}}>
    //       <OutlinedButton onClick={()=>{switchPage(RELOCATION_ACTION);}}>
    //         <RelocationIco />
    //         <span style={{ marginLeft: '8px' }}>Перемещение</span>
    //       </OutlinedButton>
    //     </div>
    //   </div>
    //   <WSTable ws={sortedWS}/>
    // </BackgroundPaper>
  );
};

export default WarehousePage;