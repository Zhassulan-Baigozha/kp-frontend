import React, { useState } from 'react';
import { IComboBoxOption, ITransferList, IWSListTable } from 'src/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { 
    AddWSToTransfer,
    CreateTransfer, 
    DeleteWSToTransfer, 
    GetTransferByDeparture,
    GetWarehouseByStoreId, 
    SendTransfer,
} from 'src/api/CustomAPI';
import BackgroundPaper from '../layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
// import WSTable from 'src/components/WSTable';
// import { OutlinedButton } from 'src/components/CustomButtons';
// import CheckIcon from '@mui/icons-material/Check';
// import ComboBox from 'src/components/ComboBox';
import { transportTypes } from 'src/constants/transportTypes';
import WSTable from 'src/components/tables/WSTable';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import TransferTable from 'src/components/tables/TransferTable';
import { convertWs } from 'src/utils/convert';
import useConvertWs from 'src/hooks/useConvertWs';
import { setTransferList } from 'src/store/data/actions';
import { Button, message } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
// import TransferList from 'src/components/Relocation_Form/TransferList';
// import WSTransfer from 'src/components/Relocation_Form/WSTransfer';


const RelocationAction: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const fromWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const dispatch = useDispatch();
    const { convertedWS } = useConvertWs();
    const [showList, setShowList] = useState<{
        transferList: boolean,
        wsInTransfer: boolean,
        wsInStore: boolean,
    }>({
        transferList: false,
        wsInTransfer: false,
        wsInStore: false,
    });
    const [wsInTransfer, setWsInTransfer] = useState<IWSListTable[]>([]);

    const [selectedTransfer, selectTransfer] = useState<number | string| null>(null);
    const [selectedWsInTransfer, setSelectedWsInTransfer] = useState<number | string| null>(null);
    const [toWarehouse, setToWarehouse] = useState<IComboBoxOption | null>(null);
    const transportList = useSelector((state: IRootState) => state.data.transportList);
    const [selectTransport, setSelectedTransport] = useState<IComboBoxOption | null>(null);
    const [transportType, setTransportType] = useState<IComboBoxOption | null>(null);
    const transferList = useSelector((state: IRootState) => state.data.transferList);
    const transferListFiltered = (a: ITransferList[]) => {
        let filteredData = a;
        if (toWarehouse?.label) {
            filteredData =  filteredData.filter(item => item.destination === toWarehouse?.label);
        }
        if (transportType?.label) {
            filteredData =  filteredData.filter(item => item.transportType === transportType?.label);
        }
        if (selectTransport) {
            filteredData =  filteredData.filter(item => item.transport === selectTransport?.label);
        }
        return filteredData;
    };
    
    const GetTransfer = (fromWarehouse: string | number) => {
        GetTransferByDeparture(token.access, fromWarehouse).then((res) => {
            if (res?.length > 0) {
                const bufTransferList = res.map((item) => ({
                    key: item.id.toString(),
                    departure: item.departure.name,
                    destination: item.destination.name,
                    transport: item.transport.number,
                    transportType: item.transport.transport_type === 'TRUCK' ? 'Машина' : 'Поезд',
                    wheelSet: item.product?.map(productItem => productItem.wheel_set),
                }));
                const bufTransferList2 = bufTransferList.filter(item => item.key === selectedTransfer);
                if (bufTransferList?.length > 0 && bufTransferList2?.length === 1 && bufTransferList2[0]?.wheelSet?.length > 0) {
                    setWsInTransfer(convertWs(bufTransferList2[0]?.wheelSet));
                } else {
                    setWsInTransfer([]);
                }
                dispatch(setTransferList(bufTransferList));
            } else {
                dispatch(setTransferList([]));
            }
        });
    };

    const [selectedWS, selectWS] = useState<number | string | null>(null);

    const filteredTransportList = transportList
        .filter((item) => (item.transport_type === transportType?.id))
        .map((item, idx) => ({ id: idx, label: item.number }));


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
                            GetTransfer(value?.id);
                            GetWarehouseByStoreId(token.access, value.id.toString()).then((res) => {
                                dispatch(setWSList(res));
                            });
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
            </div>
            <div style={{textAlign: 'right'}}>
                <div style={{ display: 'inline-block', paddingBottom: '16px', textAlign: 'right' }}>
                    <Button 
                        className={'RelocationOutlinedBtn'} 
                        onClick={()=>{
                            if (fromWarehouse?.id && toWarehouse?.id && selectTransport?.label){
                                CreateTransfer(token.access, {
                                    departure_id: +fromWarehouse.id,
                                    destination_id: +toWarehouse.id,
                                    transport_number: selectTransport.label.toString(),
                                }).then(()=>{
                                    message.success('Вы успешно создали Трансфер');
                                    GetTransfer(fromWarehouse?.id);
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
                        }}
                    >
                        <span className={'RelocationBtnText'}>Создать Трансфер</span>
                    </Button>
                    <Button 
                        className={'RelocationOutlinedBtn'} 
                        onClick={()=>{
                            if (selectedTransfer && selectedWS && fromWarehouse?.id) {
                                AddWSToTransfer(token.access, selectedTransfer, selectedWS).then(()=>{
                                    message.success('Вы успешно добавили КП в Трансфер');
                                    GetTransfer(fromWarehouse?.id);
                                    return null; 
                                });
                            } else if(selectedTransfer && selectedWS) {
                                message.error('Вы не выбрали склад отправления');
                                return null; 
                            } else if(selectedTransfer) {
                                message.error('Вы не выбрали КП');
                                return null; 
                            } else {
                                message.error('Вы не выбрали Трансфер');
                                return null; 
                            }
                        }}
                    >
                        <span className={'RelocationBtnText'}>Добавить КП в Трансфер</span>
                    </Button>
                    <Button 
                        className={'RelocationOutlinedBtn'} 
                        onClick={()=>{
                            if (selectedTransfer && selectedWsInTransfer && fromWarehouse?.id) {
                                DeleteWSToTransfer(token.access, selectedTransfer, selectedWsInTransfer).then(()=>{
                                    message.success('Вы успешно удалили КП в Трансфер');
                                    GetTransfer(fromWarehouse?.id);
                                    return null; 
                                });
                            } else if(selectedTransfer && selectedWsInTransfer) {
                                message.error('Вы не выбрали склад отправления');
                                return null; 
                            } else if (selectedTransfer){
                                message.error('Вы не выбрали КП из Трансфера');
                                return null; 
                            } else {
                                message.error('Вы не выбрали Трансфер');
                                return null; 
                            }
                        }}
                    >
                        <span className={'RelocationBtnText'}>Удалить КП в Трансфер</span>
                    </Button>
                    <Button 
                        className={'RelocationOutlinedBtn'} 
                        onClick={()=>{
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
                    >
                        <span className={'RelocationBtnText'}>Отправить</span>
                    </Button>
                </div>
            </div>
            <div className={'HeaderText'} 
                style={{ fontSize: '24px', textAlign: 'left', }} 
                onClick={()=>{ setShowList({ ...showList, transferList: !showList.transferList }); }}
            >
                Список трансферов {
                    showList.transferList ? <ArrowDownOutlined /> :<ArrowRightOutlined />
                }
            </div>
            {showList.transferList &&
                <TransferTable onChange={(_a, _b) => {
                    if (_a?.length === 1 ) {
                        selectTransfer(_a[0]);
                    } else {
                        selectTransfer(null);
                    }
                    if (_b?.length === 1 && _b[0]?.wheelSet?.length > 0) {
                        setWsInTransfer(convertWs(_b[0]?.wheelSet));
                    } else {
                        setWsInTransfer([]);
                    }
                }} selectionType={'radio'} transferList={transferListFiltered(transferList)} />
            }
            <div className={'HeaderText'} 
                style={{ fontSize: '24px', textAlign: 'left', }} 
                onClick={()=>{ setShowList({...showList, wsInTransfer: !showList.wsInTransfer }); }}
            >
                Список КП на Трансфере {
                    showList.wsInTransfer ? <ArrowDownOutlined /> : <ArrowRightOutlined />
                }
            </div>
            {showList.wsInTransfer && <WSTable onChange={(_a, _b) => {
                if (_a?.length === 1) {
                    setSelectedWsInTransfer(_a[0]);
                }
            }} selectionType={'radio'} ws={wsInTransfer}/>}
            <div className={'HeaderText'} 
                style={{ fontSize: '24px', textAlign: 'left', }} 
                onClick={()=>{ setShowList({...showList, wsInStore: !showList.wsInStore }); }}
            >
                Список КП на складе {
                    showList.wsInStore ? <ArrowDownOutlined /> : <ArrowRightOutlined />
                }
            </div>
            {showList.wsInStore && <WSTable onChange={(_a, _b) => {
                if (_a?.length === 1) {
                    selectWS(_a[0]);
                }
            }} selectionType={'radio'} ws={convertedWS}/>}
        </BackgroundPaper>
    );
};

export default RelocationAction;
