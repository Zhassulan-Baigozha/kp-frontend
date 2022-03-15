import React, { useState } from 'react';
import { IComboBoxOption, IWSListTableAddPage } from 'src/interfaces';
import { AddWSFromWagon, AppendPurchased, GetTransferByDestination, GetWagonById, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { getCurrentDateString } from 'src/utils/getCurrentDateString';
import { AddActionTypeNames } from 'src/constants/AddActionTypeNames';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import { CustomBtn, CustomCheckBtn } from 'src/components/base/CustomBtn';
import { Input, message } from 'antd';
import { convertWs2 } from 'src/utils/convert';
import { convertKeyToNumber } from 'src/utils/convert';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import TransferTable from 'src/components/tables/TransferTable';
import { setTransferList } from 'src/store/data/actions';
import useConvertWs from 'src/hooks/useConvertWs';
import EditableTable from 'src/components/tables/EditableTable';
import { useErrorHandler } from 'src/utils/useErrorHandler';
import FromOtherStore from 'src/components/AddAction_Form/FromOtherStore';
const { Search } = Input;


const AddAction: React.FC = () => {
    const { errorHandler } = useErrorHandler();
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const transferList = useSelector((state: IRootState) => state.data.transferList);
    const token = useSelector((state: IRootState) => state.token.data);
    const [typeOfAdding, setToggleTypeOfAdding] = useState<IComboBoxOption>(AddActionTypeNames[2]);
    const [selectedWS, selectWS] = useState<number[]>([]);
    const [selectWSDetailed, setSelectWSDetailed] = useState<IWSListTableAddPage[]>([]);
    const [selectedTransfer, setSelectedTransfer] = useState<number | string| null>(null);
    const dispatch = useDispatch();
    const { convertedWS2 } = useConvertWs();
    const [buffWS, setBuffWS] = useState<IWSListTableAddPage[]>([]);
    const [wagonNum, setWagonNum] = useState<string>('61891966');
    const [ws, setWS] = useState<IWSListTableAddPage[]>([]);

    const statuses = useSelector((state: IRootState) => state.data.allStatuses);
    const statusesList = statuses.map((item) =>({id: item.code, label: item.name}));
    const [selectedStatus, selectStatus] = useState<IComboBoxOption | null>(null);

    const onSearch = (value: string) => {
        setWagonNum(value);
        setWS([]);

        if (typeOfAdding?.id === 1 && wagonNum?.length === 8){
            GetWagonById(token.access, value)
                .then((getWagonByIdResponse) => {
                    const buf = convertWs2(getWagonByIdResponse.wheel_sets);
                    setWS(buf);
                })
                .catch(errorHandler);
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
            GetWagonById(token.access, wagonNum)
                .then((getWagonByIdResponse) => {
                    const buf = convertWs2(getWagonByIdResponse.wheel_sets);
                    setWS(buf);
                    message.success('Вы успешно добавили КП');
                })
                .catch(errorHandler);
        }).catch((err) => {
            setWS([]);
            errorHandler(err);
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
                    transportType: item.transport.transport_type === 'TRUCK' ? 'Машина' : 'Вагон',
                    wheelSet: item.product?.map(productItem => productItem.wheel_set),
                }))));
            } else {
                dispatch(setTransferList([]));
            }
        }).catch((err) => {
            errorHandler(err);
            dispatch(setTransferList([]));
        });
    };

    const addNewWS2 = async () => {
        try {
            if (!selectedWarehouse) {
                message.error('Вы не выбрали Склад');
                return null;
            }
            if (!selectedTransfer) {
                message.error('Вы не выбрали Трансфер');
                return null;
            }
            // работает 
            // await CompleteWSToTransfer(token.access, selectedTransfer);

            // не работает 
            selectWSDetailed.forEach((item5) =>{
                // на ремонта
                console.log('item5', item5);
                // await RepairWSChangeStatus(token.access, {
                //     description: '',
                //     state_id: 1,
                //     status_id: +selectedStatus?.id,
                //     wheelset_id: selectedWheelset.key
                // });
                // из ремонта 
                // await RepairWSUpdate(token.access, {
                //     description: selectedWheelset.description,
                //     id: selectedWheelset.key,
                //     state_id: +selectedStatus.id,
                //     status_id: +selectedWheelset.status.id,
                //     wheels: selectedWheelset?.wheels && selectedWheelset.wheels?.length > 0 ? 
                //         selectedWheelset.wheels.map((wheel)=>({
                //             date_survey: getCurrentDateString({onlyYear:false, withTZ: true}),
                //             flange: wheel.flange,
                //             rim: wheel.rim,
                //             id: wheel.id ? wheel.id : 0,
                //             state_id: +selectedStatus.id,
                //             status_id: +selectedWheelset.status.id
                //         })) : []
                // })
            });
            GetWarehouseByStoreId(token.access, selectedWarehouse.id.toString()).then((res)=>{
                dispatch(setWSList(res));
            });
            message.success('Вы успешно добавили КП');
        } catch (err) {
            errorHandler(err);
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
                date_survey: getCurrentDateString({onlyYear:false, withTZ: true}),
                description: buffWS[0].description,
                manufacturer_code: buffWS[0].manufacturerCode,
                number: buffWS[0].axisNum,
                status: 1,
                warehouse_id: +selectedWarehouse.id,
                year_issue: +buffWS[0].createdAt,
                wheels: [{
                    date_survey: getCurrentDateString({onlyYear:false, withTZ: true}),
                    manufacturer_code: buffWS[0].manufacturerCode,
                    number: buffWS[0].CKK1,
                    rim: buffWS[0].rim1,
                    status: 1,
                    flange: buffWS[0].flange1,
                    year_issue: +buffWS[0].createdAt,
                },{
                    date_survey: getCurrentDateString({onlyYear:false, withTZ: true}),
                    manufacturer_code: buffWS[0].manufacturerCode,
                    number: buffWS[0].CKK2,
                    rim: buffWS[0].rim2,
                    flange: buffWS[0].flange2,
                    status: 1,
                    year_issue: +buffWS[0].createdAt,
                }],
            };
            console.log('AppendPurchased = ', temp);
            AppendPurchased(token.access, temp)
                .then(() => {
                    message.success('Вы успешно добавили КП');
                    setBuffWS([]);
                    GetWarehouseByStoreId(token.access, selectedWarehouse.id.toString()).then((res)=>{
                        dispatch(setWSList(res));
                    });
                })
                .catch(errorHandler);
        }
    };

    return (
        <BackgroundPaper>
            <div style={{display: 'flex', paddingBottom: '8px'}}>
                <ComboBox 
                    fullWidth={'250px'}
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
                            fullWidth={'300px'}
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
                            fullWidth={'300px'}
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
                            fullWidth={'250px'}
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
                        <ComboBox 
                            fullWidth={'250px'}
                            label={'Выберите статус'}
                            options={statusesList}
                            value={selectedStatus}
                            onChange={(value) => {
                                if (value?.label && (statusesList.filter(item => item.id === value.id).length === 1)){
                                    selectStatus(statusesList.filter(item => item.id === value.id)[0]);
                                }
                            }}
                        />
                        <CustomBtn disabled={buffWS.length === 1} onClick={() => {
                            if (!selectedStatus?.label) {
                                message.error('Вы не выбрали Статус');
                            } else if (!selectedWarehouse?.label){
                                message.error('Вы не выбрали Склад');
                            } else {
                                const currentDate = Date.now().toString();
                                const buf = [{
                                    ...convertedWS2[0],
                                    axisNum: currentDate.substring(currentDate.length -8 , currentDate.length),
                                    CKK1: '00000000',
                                    CKK2: '00000000',
                                    rim1: 0,
                                    rim2: 0,
                                    flange1: 0,
                                    flange2: 0,
                                    description: 'Добавление новой КП(покупное)',
                                    editable: true,
                                    key: Date.now(),
                                    stateName: 'Принят на хранение',
                                    state: {id: 1, label: 'Принят на хранение'},
                                    statusName: selectedStatus.label,
                                    status: selectedStatus,
                                    createdAt: (new Date()).getFullYear().toString(),
                                }, ...buffWS];
                                console.log('convertedWS2', buf[0]);
                                setBuffWS(buf);
                            }
                        }}>
                            Добавить
                        </CustomBtn>
                        <CustomCheckBtn onClick={addNewWSType3}/>
                    </>
                )}
            </div>
            { typeOfAdding?.id === 2 && transferList.length > 0 && (
                <>
                    { selectWSDetailed.length > 0 && selectWSDetailed.map(item => (
                        <React.Fragment key={item.id}>
                            <FromOtherStore 
                                selectedWheelset={item} 
                                selectWheelset={(item2)=>{
                                    setSelectWSDetailed([item2, ...(selectWSDetailed.filter(item3 => item3.id !== item2.id))]);
                                }} 
                            />
                        </React.Fragment>
                    ))}
                    <TransferTable selectionType={'radio'} transferList={transferList} onChange={(_a, _b) => {
                        if (_a.length === 1) {
                            setSelectedTransfer(_a[0]);
                        }
                        if (_b.length === 1 && _b[0]?.wheelSet?.length > 0) {
                            setWS(convertWs2(_b[0].wheelSet));
                        }
                    }}/>
                </>
            )}
            { typeOfAdding?.id === 3 ? (
                <>
                    <EditableTable editable={true} ws={buffWS.concat(convertedWS2)} setWS={(item)=>{
                        if (item.length > 0) {
                            setBuffWS([item[0]]);
                        }
                    }} selectionType={'radio'} onChange={(_a, _b) => {
                        console.log('_b = ', _b);
                    }}/>
                </>
            ): ws.length > 0 ? (
                <EditableTable selectionType={'checkbox'} ws={ws} onChange={(_a, _b) => {
                    selectWS(convertKeyToNumber(_a));
                    setSelectWSDetailed(_b);
                }}/>
            ): null}
            
        </BackgroundPaper>
    );
};

export default AddAction;