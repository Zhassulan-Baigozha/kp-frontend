import React, { useState } from 'react';
import { IComboBoxOption, ITransferList, IWSListTable } from 'src/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { CreateTransfer, GetTransferByDeparture, GetTransferByDestination, GetTransfersByWh_id, GetWarehouseByStoreId, SendTransfer } from 'src/api/CustomAPI';
import BackgroundPaper from '../layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
// import WSTable from 'src/components/WSTable';
// import { OutlinedButton } from 'src/components/CustomButtons';
// import CheckIcon from '@mui/icons-material/Check';
// import ComboBox from 'src/components/ComboBox';
import { transportTypes } from 'src/constants/transportTypes';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import WSTable from 'src/components/tables/WSTable';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import TransferTable from 'src/components/tables/TransferTable';
import { convertWs } from 'src/utils/convert';
import useConvertWs from 'src/hooks/useConvertWs';
import { setTransferList } from 'src/store/data/actions';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
// import TransferList from 'src/components/Relocation_Form/TransferList';
// import WSTransfer from 'src/components/Relocation_Form/WSTransfer';


const RelocationAction: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const fromWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const dispatch = useDispatch();
    const { convertedWS } = useConvertWs();

    const [ws, setWS] = useState<IWSListTable[]>([]);
    const [selectedTransfer, selectTransfer] = useState<number | string| null>(null);
    const [toWarehouse, setToWarehouse] = useState<IComboBoxOption | null>(null);
    const transportList = useSelector((state: IRootState) => state.data.transportList);
    const [selectTransport, setSelectedTransport] = useState<IComboBoxOption | null>(null);
    const [transportType, setTransportType] = useState<IComboBoxOption | null>(null);
    const transferList = useSelector((state: IRootState) => state.data.transferList);

    console.log('convertedWS = ', convertedWS);
    // console.log('fromWarehouse = ', fromWarehouse);
    // console.log('toWarehouse = ', toWarehouse);
    // console.log('transportList = ', transportList);
    // console.log('selectTransport = ', selectTransport);




    const [getTransfersByWhApi, setGetTransfersByWhApi] = useState<any[]>([]);
    const filteredTransportList =
        transportList
            .filter((item) => (item.transport_type === transportType?.id))
            .map((item, idx) => ({ id: idx, label: item.number }));
    const [left, setLeft] = useState<string[]>([]);
    const [right, setRight] = useState<string[]>([]);
    const compare = (a: any, b: any) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    };

    return (
        <BackgroundPaper>
            <div style={{ display: 'flex' }}>
                <ComboBox
                    label={'Склад откуда'}
                    options={warehouseList}
                    value={fromWarehouse}
                    onChange={async (value: IComboBoxOption | null) => {
                        dispatch(setSelectedWS(value));
                        if (value?.id) {
                            GetTransferByDeparture(token.access, value.id).then((res) => {
                                if (res?.length > 0) {
                                    dispatch(setTransferList(res.map((item) => ({
                                        key: item.id.toString(),
                                        departure: item.departure.name,
                                        destination: item.destination.name,
                                        transport: item.transport.number,
                                        transportType: item.transport.transport_type === 'TRUCK' ? 'Машина' : 'Поезд',
                                        wheelSet: item.product?.map(productItem => productItem.wheel_set),
                                    }))));
                                } else {
                                    dispatch(setTransferList([]));
                                }
                            });
                            GetWarehouseByStoreId(token.access, value.id.toString()).then((res) => {
                                dispatch(setWSList(res));
                            });
                            const GetTransfersByWh_idResponse = await GetTransfersByWh_id(token.access, value?.id.toString());
                            console.log('GetTransfersByWh_idResponse', GetTransfersByWh_idResponse);
                            if (GetTransfersByWh_idResponse?.length > 0) {
                                setGetTransfersByWhApi(GetTransfersByWh_idResponse);
                            } else {
                                setGetTransfersByWhApi([]);
                            }
                        }
                    }}
                />
                <ComboBox
                    label={'Склад куда'}
                    options={warehouseList}
                    value={toWarehouse}
                    onChange={(value) => {
                        if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)) {
                            setToWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
                        }
                    }}
                />
                <ComboBox
                    label={'Вид транспорта'}
                    options={transportTypes}
                    value={transportType}
                    onChange={(value) => {
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
                <div style={{ display: 'inline-block' }}>
                    <CustomCheckBtn PlusOutlinedIcon={true} onClick={() => {
                        // ToDo
                        if (fromWarehouse?.id && toWarehouse?.id && selectTransport?.label){
                            CreateTransfer(token.access, {
                                departure_id: +fromWarehouse.id,
                                destination_id: +toWarehouse.id,
                                transport_number: selectTransport.label.toString(),
                            }).then(()=>{
                                message.success('Вы успешно создали Трансфер');
                            });
                        } else if(fromWarehouse?.id && toWarehouse?.id ) {
                            message.error('Вы не выбрали Транспорт');
                            return null; 
                        } else if(fromWarehouse?.id ) { 
                            message.error('Вы не Склад Куда');
                            return null; 
                        } else {
                            message.error('Вы не Склад Откуда');
                            return null; 
                        }
                    }} />
                </div>
                <div style={{ display: 'inline-block'}}>
                    <CustomCheckBtn 
                        onClick={() => {
                            if (selectedTransfer) {
                                SendTransfer(token.access, selectedTransfer).then(()=>{
                                    message.success('Вы успешно отправили Трансфер');
                                    return null; 
                                });
                            } else {
                                message.error('Вы не выбрали Трансфер');
                                return null; 
                            }
                        }} 
                    />
                </div>
            </div>
            {transferList.length > 0 &&
                <TransferTable selectionType={'radio'} transferList={transferList} onChange={(_a, _b) => {
                    if (_a?.length === 1 ) {
                        selectTransfer(_a[0]);
                    } else {
                        selectTransfer(null);
                    }
                    console.log('_a', _a);
                    console.log('_b', _b);
                    if (_b.length === 1 && _b[0].wheelSet.length > 0) {
                        setWS(convertWs(_b[0].wheelSet));
                    }
                }} />
            }
            {convertedWS.length > 0 && <WSTable ws={convertedWS} />}
        </BackgroundPaper>
    );
};

export default RelocationAction;
