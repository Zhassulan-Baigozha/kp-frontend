import React, { useState } from 'react';
import { IComboBoxOption, IPages } from 'src/interfaces';
import { IRootState } from 'src/store';
import { useSelector } from 'react-redux';
import { I_KP_ByTypes } from '../mocks/KPByTypes';
// import ComboBox from 'src/components/ComboBox';
// import BackgroundPaper from '../layout/BackgroundPaper';
// import KPByTypesTable from 'src/components/KPByTypesTable/KPByTypesTable';

const DashboardPage: React.FC<IPages> = () => {
  const warehouse = useSelector((state: IRootState) => state.warehouse.data);
  const sortedWS = useSelector((state: IRootState) => state.sortedWS.data);
  const statuses = useSelector((state: IRootState) => state.allStatuses.data);

  const warehouseList = warehouse.map((item) =>({id: item.id, label: item.name}));
  const [selectedWarehouse, selectWarehouse] = React.useState<IComboBoxOption | null>(null);

  const [statusTable, setStatusTable] = useState<I_KP_ByTypes[]>(statuses.map((item)=>({
    ...item,
    id: item.code,
    amount: sortedWS.filter((value)=> value.type === item.name).length,
    status: item.type_status,
  })));

  return (
    <div>
      DashboardPage
    </div>
    // <BackgroundPaper>
    //   <div style={{ marginBottom: '16px' }}>
    //     <ComboBox 
    //       label={'Выберите Склад'} 
    //       options={warehouseList}
    //       value={selectedWarehouse}
    //       onChange={(value) => {
    //         if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)){
    //           selectWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
    //           setStatusTable(statuses.map((item)=>({
    //             ...item,
    //             id: item.code,
    //             amount: sortedWS.filter((sortedWSItem)=> (
    //               sortedWSItem.type === item.name && 
    //               value.id === sortedWSItem.id
    //               )).length,
    //             status: item.type_status,
    //           })));
    //         } else if(value === null) {
    //           selectWarehouse(value);
    //           setStatusTable(statuses.map((item)=>({
    //             ...item,
    //             id: item.code,
    //             amount: sortedWS.filter((sortedWSItem)=> (
    //               sortedWSItem.type === item.name
    //               )).length,
    //             status: item.type_status,
    //           })));
    //         }
    //       }}
    //     />
    //   </div>
    //   <KPByTypesTable M_STORE={statusTable}/>
    // </BackgroundPaper>
  );
};

export default DashboardPage;