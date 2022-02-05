import React, { useState } from 'react';
import { IComboBoxOption, IWSListTable } from 'src/interfaces';
import { AddWSFromWagon, AppendPurchased, CompleteWSToTransfer, GetTransferByDestination, GetWagonById, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IAppendPurchasedForm } from 'src/api/CustomAPIModel';
import { getCurrentDateString } from 'src/utils/getCurrentDateString';
import { AddActionTypeNames } from 'src/constants/AddActionTypeNames';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import Purchased from 'src/components/AddAction_From/Purchased';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import { Input, message } from 'antd';
import WSTable from 'src/components/tables/WSTable';
import { convertWs } from 'src/utils/convert';
import { convertKeyToNumber } from 'src/utils/convert';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import TransferTable from 'src/components/tables/TransferTable';
import { setTransferList } from 'src/store/data/actions';
// import CustomizedInputBase from 'src/components/CustomizedInputBase';
const { Search } = Input;

const initNewField: IAppendPurchasedForm = {
    date_survey: getCurrentDateString({onlyYear:false}) ,
    description: '',
    manufacturer_code: 0,
    number: '',
    status: 1,
    warehouse_id: 0,
    year_issue: +getCurrentDateString({onlyYear:true}) ,

    wheel_left_date_survey: getCurrentDateString({onlyYear:false}),
    wheel_left_flange: '15.5',
    wheel_left_manufacturer_code: 0,
    wheel_left_number: '',
    wheel_left_rim: '15.5',
    wheel_left_status: 1,
    wheel_left_year_issue: +getCurrentDateString({onlyYear:true}) ,

    wheel_right_date_survey: getCurrentDateString({onlyYear:false}) ,
    wheel_right_flange: '15.0',
    wheel_right_manufacturer_code: 0,
    wheel_right_number: '',
    wheel_right_rim: '15.0',
    wheel_right_status: 1,
    wheel_right_year_issue: +getCurrentDateString({onlyYear:true}) ,
};

const AddAction: React.FC = () => {
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const transferList = useSelector((state: IRootState) => state.data.transferList);
    const token = useSelector((state: IRootState) => state.token.data);
    const [typeOfAdding, setToggleTypeOfAdding] = useState<IComboBoxOption>(AddActionTypeNames[2]);
    const [selectedWS, selectWS] = useState<number[]>([]);
    const [selectedTransfer, setSelectedTransfer] = useState<number | string| null>(null);
    const dispatch = useDispatch();


    const [purchasedWSData, setPurchasedWSData] = useState<IAppendPurchasedForm>(initNewField);
    const [wagonNum, setWagonNum] = useState<string>('61891966');
    // const [transferList, setTransferList] = useState<ITransferList[]>([]);

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
            purchasedWSData.wheel_left_rim
            && purchasedWSData.wheel_right_rim
            && purchasedWSData.wheel_right_flange
            && purchasedWSData.wheel_left_flange
        ){
            const temp = {
                date_survey: purchasedWSData.date_survey + 'T00:00:00Z',
                description: purchasedWSData.description,
                manufacturer_code: purchasedWSData.manufacturer_code ? purchasedWSData.manufacturer_code : 0,
                number: purchasedWSData.number,
                status: 1,
                warehouse_id: +selectedWarehouse.id,
                year_issue: purchasedWSData.year_issue? purchasedWSData.year_issue: 0,
                wheels: [{
                    date_survey: purchasedWSData.wheel_left_date_survey + 'T00:00:00Z',
                    flange: parseFloat(purchasedWSData.wheel_left_flange),
                    manufacturer_code: purchasedWSData.wheel_left_manufacturer_code ? purchasedWSData.wheel_left_manufacturer_code : 0,
                    number: purchasedWSData.wheel_left_number ? purchasedWSData.wheel_left_number : '',
                    rim: parseFloat(purchasedWSData.wheel_left_rim),
                    status: 1,
                    year_issue: purchasedWSData.wheel_left_year_issue ? purchasedWSData.wheel_left_year_issue : 0,
                },{
                    date_survey: purchasedWSData.wheel_right_date_survey + 'T00:00:00Z',
                    flange: parseFloat(purchasedWSData.wheel_right_flange),
                    manufacturer_code: purchasedWSData.wheel_right_manufacturer_code ? purchasedWSData.wheel_right_manufacturer_code : 0,
                    number: purchasedWSData.wheel_right_number ? purchasedWSData.wheel_right_number : '',
                    rim: parseFloat(purchasedWSData.wheel_right_rim),
                    status: 1,
                    year_issue: purchasedWSData.wheel_right_year_issue ? purchasedWSData.wheel_right_year_issue : 0,
                }],
            };
            AppendPurchased(token.access, temp)
                .then(() => {
                    message.success('Вы успешно добавили КП');
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
                                    console.log('value = ', value);
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
                                if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)){
                                    setPurchasedWSData({...purchasedWSData, warehouse_id: +value.id});
                                } else if(value === null) {
                                    setPurchasedWSData({...purchasedWSData, warehouse_id: 0});
                                }
                            }}
                        />
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
                <Purchased purchasedWSData={purchasedWSData} setPurchasedWSData={setPurchasedWSData} />
            ): ws.length > 0 ? (
                <WSTable ws={ws} onChange={(_a, _b) => {
                    selectWS(convertKeyToNumber(_a));
                }}/>
            ): null}
        </BackgroundPaper>
    );
};

export default AddAction;