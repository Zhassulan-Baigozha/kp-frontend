import React, { useState } from 'react';
import { IComboBoxOption, ITransferList, IWSListTable } from 'src/interfaces';
import { AddWSFromWagon, AppendPurchased, GetTransferByDestination, GetWagonById, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IAppendPurchasedForm } from 'src/api/CustomAPIModel';
import { getCurrentDateString } from 'src/utils/getCurrentDateString';
import { AddActionTypeNames } from 'src/constants/AddActionTypeNames';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import Purchased from 'src/components/AddAction_From/Purchased';
import CustomTextField from 'src/components/base/CustomTextField';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import { Input, message } from 'antd';
import WSTable from 'src/components/tables/WSTable';
import { convertWs } from 'src/utils/convert';
import { convertKeyToNumber } from 'src/utils/convert';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import TransferTable from 'src/components/tables/TransferTable';
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
    wheel_left_flange: 0,
    wheel_left_manufacturer_code: 0,
    wheel_left_number: '',
    wheel_left_rim: 0,
    wheel_left_status: 1,
    wheel_left_year_issue: +getCurrentDateString({onlyYear:true}) ,

    wheel_right_date_survey: getCurrentDateString({onlyYear:false}) ,
    wheel_right_flange: 0,
    wheel_right_manufacturer_code: 0,
    wheel_right_number: '',
    wheel_right_rim: 0,
    wheel_right_status: 1,
    wheel_right_year_issue: +getCurrentDateString({onlyYear:true}) ,
};

const AddAction: React.FC = () => {
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const [typeOfAdding, setToggleTypeOfAdding] = useState<IComboBoxOption>(AddActionTypeNames[1]);
    const [selectedWS, selectWS] = useState<number[]>([]);
    const dispatch = useDispatch();


    // const [selectedWarehouse, selectWarehouse] = useState<IComboBoxOption | null>(null);
    const [purchasedWSData, setPurchasedWSData] = useState<IAppendPurchasedForm>(initNewField);
    const [wagonNum, setWagonNum] = useState<string>('21206958');
    const [transferList, setTransferList] = useState<ITransferList[]>([]);

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
                    // setWagonBtnDisabled(true);
                    // setWagonExists('find');
                })
                .catch((err)=>{
                    // setWagonBtnDisabled(true);
                    // setWagonExists('notFind');
                    console.error(err.response.code);
                    console.error(err.response.status);
                    console.error(err.response.message);
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
            message.error(err.response.data.message);
            message.error(err.response.data.system_message);
            console.log(err);
        });
    };

    const addNewWS2 = () => {
        console.log('addNewWS2');
    };

    const addNewWSType3 = () => {
        if (!selectedWarehouse?.id){ 
            message.error('Вы не выбрали Склад');
            return null; 
        }
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
                flange: purchasedWSData.wheel_left_flange? purchasedWSData.wheel_left_flange : 0,
                manufacturer_code: purchasedWSData.wheel_left_manufacturer_code ? purchasedWSData.wheel_left_manufacturer_code : 0,
                number: purchasedWSData.wheel_left_number ? purchasedWSData.wheel_left_number : '',
                rim: purchasedWSData.wheel_left_rim? purchasedWSData.wheel_left_rim : 0,
                status: 1,
                year_issue: purchasedWSData.wheel_left_year_issue ? purchasedWSData.wheel_left_year_issue : 0,
            },{
                date_survey: purchasedWSData.wheel_right_date_survey + 'T00:00:00Z',
                flange: purchasedWSData.wheel_right_flange? purchasedWSData.wheel_right_flange : 0,
                manufacturer_code: purchasedWSData.wheel_right_manufacturer_code ? purchasedWSData.wheel_right_manufacturer_code : 0,
                number: purchasedWSData.wheel_right_number ? purchasedWSData.wheel_right_number : '',
                rim: purchasedWSData.wheel_right_rim? purchasedWSData.wheel_right_rim : 0,
                status: 1,
                year_issue: purchasedWSData.wheel_right_year_issue ? purchasedWSData.wheel_right_year_issue : 0,
            }],
        };
        AppendPurchased(token.access, temp)
            .then(() => {
                message.success('Вы успешно добавили КП');
            })
            .catch((err)=>{
                message.error('Произошла ошибка. Попробуйте перезагрузить страницу и попробуйте снова.');
                message.error(err.response.data.message);
                message.error(err.response.data.system_message);
                console.error(err);
            });
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
                                // GetTransferByDestination
                                dispatch(setSelectedWS(value));
                                if (value?.id) {
                                    console.log('value = ', value);
                                    GetTransferByDestination(token.access, value.id).then((res) => {
                                        if (res?.length > 0) {
                                            setTransferList(res.map((item) => ({
                                                key: item.id.toString(),
                                                departure: item.departure.name,
                                                destination: item.destination.name,
                                                transport: item.transport.number,
                                                transportType: item.transport.transport_type === 'TRUCK' ? 'Машина':'Поезд',
                                                wheelSet: item.product.map(productItem => productItem.wheel_set),
                                            })));
                                        } else {
                                            setTransferList([]);
                                        }
                                    });
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
                    console.log('_a', _a);
                    console.log('_b', _b);
                    if (_b.length === 1 && _b[0].wheelSet.length > 0) {
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