/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { IComboBoxOption } from 'src/interfaces';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { GetTransfersByWh_id, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import { IGridData } from 'src/api/CustomAPIModel';
import BackgroundPaper from '../layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
// import WSTable from 'src/components/WSTable';
// import { OutlinedButton } from 'src/components/CustomButtons';
// import CheckIcon from '@mui/icons-material/Check';
// import ComboBox from 'src/components/ComboBox';
import { transportTypes } from 'src/constants/transportTypes';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import useWarehouseList from 'src/hooks/useWarehouseList';
// import TransferList from 'src/components/Relocation_Form/TransferList';
// import WSTransfer from 'src/components/Relocation_Form/WSTransfer';


const RelocationAction: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const statuses = useSelector((state: IRootState) => state.allStatuses.data);
    const { warehouseList } = useWarehouseList();
    const transportList = useSelector((state: IRootState) => state.transportList.data);
    const [selectTransport, setSelectedTransport] = useState<IComboBoxOption | null>(null);
    const [transportType, setTransportType] = useState<IComboBoxOption | null>(null);
    const [transferList, setTransferList] = useState<IComboBoxOption[]>([]);
    const [getTransfersByWhApi, setGetTransfersByWhApi] = useState<any[]>([]);
    const filteredTransportList = 
    transportList
        .filter((item) => (item.transport_type === transportType?.id))
        .map((item, idx) => ({id: idx, label: item.number}));
    const [fromWarehouse, setFromWarehouse] = useState<IComboBoxOption | null>(null);
    const [toWarehouse, setToWarehouse] = useState<IComboBoxOption | null>(null);
    const [ws, setWS] = useState<IGridData[]>([]);
    const [left, setLeft] = useState<string[]>([]);
    const [right, setRight] = useState<string[]>([]);
    const compare = (a:any, b:any) => {
        if (a.id < b.id ) return -1;
        if (a.id > b.id ) return 1;
        return 0;
    };
    console.log('transportList = ', transportList);
    console.log('selectTransport = ', selectTransport);
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
                            setToWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
                        }
                    }}
                />
                <ComboBox 
                    label={'Вид транспорта'} 
                    options={transportTypes}
                    value={transportType}
                    onChange={(value)=>{
                        console.log('value = ', value);
                        setTransportType(value);
                        setSelectedTransport(null);
                    }}
                />
                <ComboBox 
                    label={'Номер транспорта'} 
                    options={filteredTransportList}
                    value={selectTransport}
                    onChange={setSelectedTransport}
                />
                <div style={{display: 'inline-block'}}>
                    <CustomCheckBtn onClick={()=>{}}/>
                </div>
            </div>
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