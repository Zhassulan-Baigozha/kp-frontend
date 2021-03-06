import React, { useState } from 'react';
import { IComboBoxOption, ITransferList, IWSListTable, IWSListTableAddPage } from 'src/interfaces';
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
import { transportTypes } from 'src/constants/transportTypes';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import TransferTable from 'src/components/tables/TransferTable';
import { convertWs, convertWs2 } from 'src/utils/convert';
import useConvertWs from 'src/hooks/useConvertWs';
import { setTransferList } from 'src/store/data/actions';
import { Button, message } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import EditableTable from 'src/components/tables/EditableTable';


const RelocationAction: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const fromWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const dispatch = useDispatch();
    const { convertedWS2 } = useConvertWs();
    const [showList, setShowList] = useState<{
        transferList: boolean,
        wsInTransfer: boolean,
        wsInStore: boolean,
    }>({
        transferList: false,
        wsInTransfer: false,
        wsInStore: false,
    });
    const [wsInTransfer, setWsInTransfer] = useState<IWSListTableAddPage[]>([]);

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
                    transportType: item.transport.transport_type === 'TRUCK' ? '????????????' : '??????????',
                    wheelSet: item.product?.map(productItem => productItem.wheel_set),
                }));
                const bufTransferList2 = bufTransferList.filter(item => item.key === selectedTransfer);
                if (bufTransferList?.length > 0 && bufTransferList2?.length === 1 && bufTransferList2[0]?.wheelSet?.length > 0) {
                    setWsInTransfer(convertWs2(bufTransferList2[0]?.wheelSet));
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
                    fullWidth={'250px'}
                    label={'?????????? ????????????'}
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
                    fullWidth={'250px'}
                    label={'?????????? ????????'}
                    options={warehouseList}
                    value={toWarehouse}
                    onChange={(value) => {
                        if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)) {
                            setToWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
                        }
                    }}
                />
                <ComboBox
                    fullWidth={'250px'}
                    label={'?????? ????????????????????'}
                    options={transportTypes}
                    value={transportType}
                    onChange={(value) => {
                        console.log('value = ', value);
                        setTransportType(value);
                        setSelectedTransport(null);
                    }}
                />
                <ComboBox
                    fullWidth={'250px'}
                    label={'?????????? ????????????????????'}
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
                                    message.success('???? ?????????????? ?????????????? ????????????????');
                                    GetTransfer(fromWarehouse?.id);
                                });
                            } else if(fromWarehouse?.id && toWarehouse?.id ) {
                                message.error('???? ???? ?????????????? ??????????????????');
                                return null; 
                            } else if(fromWarehouse?.id ) { 
                                message.error('???? ???? ?????????? ????????');
                                return null; 
                            } else {
                                message.error('???? ???? ?????????? ????????????');
                                return null; 
                            }
                        }}
                    >
                        <span className={'RelocationBtnText'}>?????????????? ????????????????</span>
                    </Button>
                    <Button 
                        className={'RelocationOutlinedBtn'} 
                        onClick={()=>{
                            if (selectedTransfer && selectedWS && fromWarehouse?.id) {
                                AddWSToTransfer(token.access, selectedTransfer, selectedWS).then(()=>{
                                    message.success('???? ?????????????? ???????????????? ???? ?? ????????????????');
                                    GetTransfer(fromWarehouse?.id);
                                    return null; 
                                });
                            } else if(selectedTransfer && selectedWS) {
                                message.error('???? ???? ?????????????? ?????????? ??????????????????????');
                                return null; 
                            } else if(selectedTransfer) {
                                message.error('???? ???? ?????????????? ????');
                                return null; 
                            } else {
                                message.error('???? ???? ?????????????? ????????????????');
                                return null; 
                            }
                        }}
                    >
                        <span className={'RelocationBtnText'}>???????????????? ???? ?? ????????????????</span>
                    </Button>
                    <Button 
                        className={'RelocationOutlinedBtn'} 
                        onClick={()=>{
                            if (selectedTransfer && selectedWsInTransfer && fromWarehouse?.id) {
                                DeleteWSToTransfer(token.access, selectedTransfer, selectedWsInTransfer).then(()=>{
                                    message.success('???? ?????????????? ?????????????? ???? ?? ????????????????');
                                    GetTransfer(fromWarehouse?.id);
                                    return null; 
                                });
                            } else if(selectedTransfer && selectedWsInTransfer) {
                                message.error('???? ???? ?????????????? ?????????? ??????????????????????');
                                return null; 
                            } else if (selectedTransfer){
                                message.error('???? ???? ?????????????? ???? ???? ??????????????????');
                                return null; 
                            } else {
                                message.error('???? ???? ?????????????? ????????????????');
                                return null; 
                            }
                        }}
                    >
                        <span className={'RelocationBtnText'}>?????????????? ???? ?? ????????????????</span>
                    </Button>
                    <Button 
                        className={'RelocationOutlinedBtn'} 
                        onClick={()=>{
                            if (selectedTransfer) {
                                SendTransfer(token.access, selectedTransfer).then(()=>{
                                    message.success('???? ?????????????? ?????????????????? ????????????????');
                                    return null; 
                                });
                            } else {
                                message.error('???? ???? ?????????????? ????????????????');
                                return null; 
                            }
                        }}
                    >
                        <span className={'RelocationBtnText'}>??????????????????</span>
                    </Button>
                </div>
            </div>
            <div className={'HeaderText'} 
                style={{ fontSize: '24px', textAlign: 'left', }} 
                onClick={()=>{ setShowList({ ...showList, transferList: !showList.transferList }); }}
            >
                ???????????? ???????????????????? {
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
                        setWsInTransfer(convertWs2(_b[0]?.wheelSet));
                    } else {
                        setWsInTransfer([]);
                    }
                }} selectionType={'radio'} transferList={transferListFiltered(transferList)} />
            }
            <div className={'HeaderText'} 
                style={{ fontSize: '24px', textAlign: 'left', }} 
                onClick={()=>{ setShowList({...showList, wsInTransfer: !showList.wsInTransfer }); }}
            >
                ???????????? ???? ???? ?????????????????? {
                    showList.wsInTransfer ? <ArrowDownOutlined /> : <ArrowRightOutlined />
                }
            </div>
            {showList.wsInTransfer && <EditableTable onChange={(_a, _b) => {
                if (_a?.length === 1) {
                    setSelectedWsInTransfer(_a[0]);
                }
            }} selectionType={'radio'} ws={wsInTransfer}/>}
            <div className={'HeaderText'} 
                style={{ fontSize: '24px', textAlign: 'left', }} 
                onClick={()=>{ setShowList({...showList, wsInStore: !showList.wsInStore }); }}
            >
                ???????????? ???? ???? ???????????? {
                    showList.wsInStore ? <ArrowDownOutlined /> : <ArrowRightOutlined />
                }
            </div>
            {showList.wsInStore && <EditableTable onChange={(_a, _b) => {
                if (_a?.length === 1) {
                    selectWS(_a[0]);
                }
            }} selectionType={'radio'} ws={convertedWS2}/>}
        </BackgroundPaper>
    );
};

export default RelocationAction;
