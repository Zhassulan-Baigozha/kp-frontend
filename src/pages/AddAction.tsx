import React, { useState } from 'react';
import { IComboBoxOption, IWSListTable, IWSListTableAddPage } from 'src/interfaces';
import { AddWSFromWagon, AppendPurchased, CompleteWSToTransfer, GetTransferByDestination, GetWagonById, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IAppendPurchasedForm } from 'src/api/CustomAPIModel';
import { getCurrentDateString } from 'src/utils/getCurrentDateString';
import { AddActionTypeNames } from 'src/constants/AddActionTypeNames';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import { CustomBtn, CustomCheckBtn } from 'src/components/base/CustomBtn';
import { Input, message } from 'antd';
import WSTable from 'src/components/tables/WSTable';
import { convertWs } from 'src/utils/convert';
import { convertKeyToNumber } from 'src/utils/convert';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import TransferTable from 'src/components/tables/TransferTable';
import { setTransferList } from 'src/store/data/actions';
import useConvertWs from 'src/hooks/useConvertWs';
import EditableTable from 'src/components/tables/EditableTable';
const { Search } = Input;


const AddAction: React.FC = () => {
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const transferList = useSelector((state: IRootState) => state.data.transferList);
    const token = useSelector((state: IRootState) => state.token.data);
    const [typeOfAdding, setToggleTypeOfAdding] = useState<IComboBoxOption>(AddActionTypeNames[2]);
    const [selectedWS, selectWS] = useState<number[]>([]);
    const [selectedTransfer, setSelectedTransfer] = useState<number | string| null>(null);
    const dispatch = useDispatch();
    const { convertedWS2 } = useConvertWs();
    const [buffWS, setBuffWS] = useState<IWSListTableAddPage[]>([]);
    const [wagonNum, setWagonNum] = useState<string>('61891966');

    const [ws, setWS] = useState<IWSListTable[]>([]);

    const onSearch = (value: string) => {
        setWagonNum(value);
        setWS([]);

        if (typeOfAdding?.id === 1 && wagonNum?.length === 8){
            GetWagonById(token.access, value)
                .then((getWagonByIdResponse) => {
                    const buf = convertWs([
                        getWagonByIdResponse.wheel_set_first,
                        getWagonByIdResponse.wheel_set_second,
                        getWagonByIdResponse.wheel_set_third,
                        getWagonByIdResponse.wheel_set_fourth
                    ]);
                    setWS(buf);
                })
                .catch((err)=>{
                    console.error(err);
                    message.error(err.response.data.message);
                    message.error(err.response.data.system_message);
                });
        }
    };

    const addNewWS1 = () => {
        if (!selectedWarehouse?.id){ 
            message.error('Вы не выбрали Склад');
            return null; 
        }
        if (wagonNum.length === 0){ 
            message.error('Вы не выбрали Вагон');
            return null; 
        }
        if (selectedWS.length <= 0){ 
            message.error('Вы не выбрали КП');
            return null; 
        }
        AddWSFromWagon(token.access, {
            wagon_id: +wagonNum, 
            description: '',
            warehouse_id: +selectedWarehouse.id,
            ws_list: selectedWS
        }).then((_res)=>{
            message.success('Вы успешно добавили КП');
        }).catch((err) => {
            console.log(err);
            message.error(err.response.data.message);
            message.error(err.response.data.system_message);
        });
    };

    const GetTransfer = (toWarehouse: string | number) => {
        GetTransferByDestination(token.access, toWarehouse).then((res) => {
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
    };

    const addNewWS2 = () => {
        if (selectedTransfer){
            CompleteWSToTransfer(token.access, selectedTransfer).then(() => {
                message.success('Вы успешно добавили КП');
            });
        } else {
            message.error('Вы не выбрали Трансфер');
        }
        
    };

    const addNewWSType3 = () => {
        if (
            !selectedWarehouse?.id
        ){ 
            message.error('Вы не выбрали Склад');
            return null; 
        }
        if (
            buffWS.length === 1
        ){
            const temp = {
                date_survey: getCurrentDateString({onlyYear:false}) + 'T00:00:00Z',
                description: buffWS[0].description,
                manufacturer_code: buffWS[0].manufacturerCode,
                number: buffWS[0].axisNum,
                status: 1,
                warehouse_id: +selectedWarehouse.id,
                year_issue: +buffWS[0].createdAt,
                wheels: [{
                    date_survey: getCurrentDateString({onlyYear:false}) + 'T00:00:00Z',
                    manufacturer_code: buffWS[0].manufacturerCode,
                    number: buffWS[0].CKK1,
                    rim: buffWS[0].rim1,
                    status: 1,
                    flange: buffWS[0].flange1,
                    year_issue: +buffWS[0].createdAt,
                },{
                    date_survey: getCurrentDateString({onlyYear:false}) + 'T00:00:00Z',
                    manufacturer_code: buffWS[0].manufacturerCode,
                    number: buffWS[0].CKK2,
                    rim: buffWS[0].rim2,
                    flange: buffWS[0].flange2,
                    status: 1,
                    year_issue: +buffWS[0].createdAt,
                }],
            };

            AppendPurchased(token.access, temp)
                .then(() => {
                    message.success('Вы успешно добавили КП');
                    setBuffWS([]);
                })
                .catch((err)=>{
                    console.error(err);
                    message.error('Произошла ошибка. Попробуйте перезагрузить страницу и попробуйте снова.');
                    message.error(err.response.data.message);
                    message.error(err.response.data.system_message);
                });
        }
    };

    return (
        <BackgroundPaper>
            <div style={{display: 'flex', paddingBottom: '8px'}}>
                <ComboBox 
                    fullWidth={false}
                    label={'Выберите формат добавления'} 
                    options={AddActionTypeNames}
                    value={typeOfAdding}
                    verticalAlign={true}
                    onChange={(value)=>{
                        if (value){
                            setToggleTypeOfAdding(value);
                            setWS([]);
                        }
                    }}
                />
                { typeOfAdding?.id === 1 && (
                    <>
                        <ComboBox 
                            fullWidth={false}
                            label={'Выберите Склад'} 
                            options={warehouseList}
                            value={selectedWarehouse}
                            verticalAlign={true}
                            onChange={(value) => {
                                dispatch(setSelectedWS(value));
                                if (value?.id) {
                                    GetWarehouseByStoreId(token.access, value.id.toString()).then((res)=>{
                                        dispatch(setWSList(res));
                                    });
                                }
                            }}
                        />
                        <Search 
                            placeholder={'Номер вагона'}
                            value={wagonNum}
                            onSearch={onSearch} 
                            style={{ width: 300, marginRight: '16px' }} 
                            onChange={(value)=>{
                                setWagonNum(value.target.value);
                            }}
                            // validate={wagonExists}
                        />
                        <CustomCheckBtn onClick={addNewWS1} />
                    </>
                )}
                {typeOfAdding?.id === 2 && (
                    <>
                        <ComboBox 
                            fullWidth={false}
                            label={'Выберите Склад'} 
                            options={warehouseList}
                            value={selectedWarehouse}
                            onChange={(value) => {
                                dispatch(setSelectedWS(value));
                                if (value?.id) {
                                    GetTransfer(value?.id);
                                    GetWarehouseByStoreId(token.access, value.id.toString()).then((res)=>{
                                        dispatch(setWSList(res));
                                    });
                                }
                            }}
                        />
                        <CustomCheckBtn onClick={addNewWS2}/>
                    </>
                )}
                {(typeOfAdding?.id === 3) && (
                    <>
                        <ComboBox 
                            fullWidth={false}
                            label={'Выберите Склад'} 
                            options={warehouseList}
                            value={selectedWarehouse}
                            onChange={(value) => {
                                dispatch(setSelectedWS(value));
                                if (value?.id) {
                                    GetWarehouseByStoreId(token.access, value.id.toString()).then((res)=>{
                                        dispatch(setWSList(res));
                                    });
                                }
                            }}
                        />
                        <CustomBtn disabled={buffWS.length === 1} onClick={()=>{
                            const buf = [{
                                ...convertedWS2[0],
                                axisNum: Date.now().toString(),
                                CKK1: '00000000',
                                CKK2: '00000000',
                                rim1: 0,
                                rim2: 0,
                                flange1: 0,
                                flange2: 0,
                                description: 'Добавление новой КП',
                                editable: true,
                                key: Date.now(),
                            },...buffWS];
                            console.log('convertedWS2', buf);
                            setBuffWS(buf);
                        }}>
                            Добавить
                        </CustomBtn>
                        <CustomCheckBtn onClick={addNewWSType3}/>
                    </>
                )}
            </div>
            { typeOfAdding?.id === 2 && transferList.length > 0 &&
                <TransferTable selectionType={'radio'} transferList={transferList} onChange={(_a, _b) => {
                    if (_a.length === 1) {
                        setSelectedTransfer(_a[0]);
                    }
                    if (_b.length === 1 && _b[0]?.wheelSet?.length > 0) {
                        setWS(convertWs(_b[0].wheelSet));
                    }
                }}/>
            }
            { typeOfAdding?.id === 3 ? (
                <>
                    <EditableTable  ws={buffWS.concat(convertedWS2)} setWS={(item)=>{
                        if (item.length > 0) {
                            setBuffWS([item[0]]);
                        }
                    }} selectionType={'radio'} onChange={(_a, _b) => {
                        console.log('_b = ', _b);
                    }}/>
                </>
            ): ws.length > 0 ? (
                <WSTable ws={ws} onChange={(_a, _b) => {
                    selectWS(convertKeyToNumber(_a));
                }}/>
            ): null}
        </BackgroundPaper>
    );
};

export default AddAction;