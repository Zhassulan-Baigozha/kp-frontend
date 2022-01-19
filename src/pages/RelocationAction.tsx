import React, { useState } from 'react';
import { IComboBoxOption } from 'src/interfaces';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { GetTransfersByWh_id, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import ConvertWS from 'src/utils/ConvertWS';
import { IGridData } from 'src/api/CustomAPIModel';
import BackgroundPaper from '../layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
// import WSTable from 'src/components/WSTable';
// import { OutlinedButton } from 'src/components/CustomButtons';
// import CheckIcon from '@mui/icons-material/Check';
// import ComboBox from 'src/components/ComboBox';
import { transportTypes } from 'src/constants/transportTypes';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
// import TransferList from 'src/components/Relocation_Form/TransferList';
// import WSTransfer from 'src/components/Relocation_Form/WSTransfer';


const RelocationAction: React.FC = () => {
  const token = useSelector((state: IRootState) => state.token.data);
  const statuses = useSelector((state: IRootState) => state.allStatuses.data);
  const warehouse = useSelector((state: IRootState) => state.warehouse.data);
  const transportList = useSelector((state: IRootState) => state.transportList.data);
  const [selectTransport, setSelectTransport] = React.useState<IComboBoxOption | null>(null);
  const [transportType, setTransportType] = React.useState<IComboBoxOption | null>(null);
  const [transferList, setTransferList] = React.useState<IComboBoxOption[]>([]);
  const [getTransfersByWhApi, setGetTransfersByWhApi] = React.useState<any[]>([]);
  const tempTransportList = 
    transportList
    .filter((item) => (
      (item.transport_type === 'TRAIN' && transportType?.id === 2)
      || (item.transport_type === 'TRUCK' && transportType?.id === 1)
    )).map((item, idx) => ({id: idx, label: item.number}));
  const warehouseList = warehouse.map((item) =>({id: item.id, label: item.name}));
  const [fromWarehouse, setFromWarehouse] = React.useState<IComboBoxOption | null>(null);
  const [toWarehouse, setToWarehouse] = React.useState<IComboBoxOption | null>(null);
  const [ws, setWS] = useState<IGridData[]>([]);
  const [left, setLeft] = useState<string[]>([]);
  const [right, setRight] = useState<string[]>([]);
  const compare = (a:any, b:any) => {
    if (a.id < b.id ) return -1;
    if (a.id > b.id ) return 1;
    return 0;
  };

  return (
    <BackgroundPaper>
      <div style={{ display: 'flex'}}>
        <ComboBox 
          label={'Склад откуда'} 
          options={warehouseList}
          value={fromWarehouse}
          onChange={async (value: IComboBoxOption | null) => {
            console.log('value = ', value);
            if (value?.id){
              setFromWarehouse(value);
              // await GetWarehouseByStoreId(token.access, value.id.toString())
              //   .then((response)=>{
              //     const ConvertWSResponse = ConvertWS(response);
              //     setWS(ConvertWSResponse);
              //     setLeft(ConvertWSResponse.map(item=> (
              //       (item.idAxis ? ('№ Оси:'  + item.idAxis.toString() + '; '): '') + 
              //       (item.CKK_1 ?  ('№ КП_1:' + item.CKK_1.toString() + '; '): '') + 
              //       (item.CKK_2 ?  ('№ КП_2:' + item.CKK_2.toString() + '; '): '')
              //     )));
              //   })
              const GetTransfersByWh_idResponse = await GetTransfersByWh_id(token.access, value?.id.toString());
              console.log('GetTransfersByWh_idResponse', GetTransfersByWh_idResponse);
              if (GetTransfersByWh_idResponse?.length > 0) {
                setGetTransfersByWhApi(GetTransfersByWh_idResponse);
                setTransferList(
                  GetTransfersByWh_idResponse.map(item => ({
                    id: item.id,
                    label: item.departure.name + ' - ' 
                    + item.destination.name + ' - ' 
                    + item.transport.number
                  })).sort(compare)
                );
              } else {
                setGetTransfersByWhApi([]);
                setTransferList([]);
              }
            }
          }}
        />
        <ComboBox 
          label={'Склад куда'} 
          options={warehouseList}
          value={toWarehouse}
          onChange={(value) => {
            if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)){
              setToWarehouse(warehouseList.filter(item => item.id === value.id)[0])
            }
          }}
        />
        <ComboBox 
          label={'Вид транспорта'} 
          options={transportTypes}
          value={transportType}
          onChange={(value)=>{
            setTransportType(value);
            setSelectTransport(null);
          }}
        />
        <ComboBox 
          label={'Номер транспорта'} 
          options={tempTransportList}
          value={selectTransport}
          onChange={setSelectTransport}
        />
        <div style={{display: 'inline-block'}}>
          <CustomCheckBtn onClick={()=>{}}/>
        </div>
      </div>
      {/* { transferList.length > 0 && <TransferList 
        list={transferList}
        onSelect={(value)=>{
          console.log('TransferList', value, transferList);
          console.log('getTransfersByWhApi', getTransfersByWhApi);
          const fub = getTransfersByWhApi.filter((item)=> item.id === (+value));
          console.log('fub', fub);
          const buf2:string[] = [];
          if (fub?.length > 0 && fub[0].wheelsets) {
            fub[0].wheelsets.map((wheelset: any) => {
              let sfa = (wheelset.wheel_set.number ? ('№ Оси:'  + wheelset.wheel_set.number + '; '): '');
              console.log('sfa', sfa);
              wheelset.wheel_set.wheels?.map((item: any, idx: number) => {
                sfa = sfa + (item.number ? (`№ КП_${(idx + 1).toString()}:`  + item.number + '; '): '');
              });
              buf2.push(sfa);
            });
            setRight(buf2);
          } else {
            setRight([]);
          }
        }}
      />} */}
      {/* <WSTransfer 
        left={left}
        setLeft={setLeft}
        right={right}
        setRight={setRight}
      />
      { ws.length > 0 && <WSTable ws={ws}/> } */}
    </BackgroundPaper>
  );
};

export default RelocationAction;