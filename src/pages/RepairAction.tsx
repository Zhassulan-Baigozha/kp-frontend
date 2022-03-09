import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IComboBoxOption, IWSListTableAddPage } from 'src/interfaces';
import { GetWarehouseByStoreId, RepairWSChangeStatus, RepairWSUpdate } from 'src/api/CustomAPI';
import BackgroundPaper from '../layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import { message } from 'antd';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import { RepairTypeOptions } from 'src/constants/RepairTypeOptions';
import useConvertWs from 'src/hooks/useConvertWs';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import FromRepair from 'src/components/RepairAction_Form/FromRepair';
import { getCurrentDateString } from 'src/utils/getCurrentDateString';
import EditableTable from 'src/components/tables/EditableTable';
import { useErrorHandler } from 'src/utils/useErrorHandler';


const RepairAction: React.FC = () => {
    const { errorHandler } = useErrorHandler();
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const token = useSelector((state: IRootState) => state.token.data);
    const statuses = useSelector((state: IRootState) => state.data.allStatuses);
    const statusesList = statuses.map((item) =>({id: item.code, label: item.name}));
    const [selectedStatus, selectStatus] = useState<IComboBoxOption | null>(null);
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const dispatch = useDispatch();
    const { convertedWS2 } = useConvertWs();
    const [selectedWheelset, selectWheelset] = useState<IWSListTableAddPage | null>(null);
    const [repairType, setRepairType] = useState<boolean>(false);

    const sendRepair = () => {
        if (!selectedWarehouse?.id) { 
            message.error('Вы не выбрали Склад');
            return null; 
        }
        if (!selectedStatus?.id) { 
            message.error('Вы не выбрали Статус');
            return null; 
        }
        if (!selectedWheelset?.key) { 
            message.error('Вы не выбрали КП');
            return null; 
        }

        if (repairType){
            // Из ремонта
            if (selectedWheelset) {
                RepairWSUpdate(token.access, {
                    description: selectedWheelset.description,
                    id: selectedWheelset.key,
                    state_id: +selectedStatus.id,
                    status_id: +selectedWheelset.status.id,
                    wheels: selectedWheelset?.wheels && selectedWheelset.wheels?.length > 0 ? 
                        selectedWheelset.wheels.map((wheel)=>({
                            date_survey: getCurrentDateString({onlyYear:false, withTZ: true}),
                            flange: wheel.flange,
                            rim: wheel.rim,
                            id: wheel.id ? wheel.id : 0,
                            state_id: +selectedStatus.id,
                            status_id: +selectedWheelset.status.id
                        })) : []
                })
                    .then(() => {
                        GetWarehouseByStoreId(token.access, selectedWarehouse.id.toString()).then((res)=>{
                            dispatch(setWSList(res));
                        });
                        message.success('Отремонтировали КП');
                    }).catch(errorHandler);
            }
        } else {
            // На ремонт
            RepairWSChangeStatus(token.access, {
                description: '',
                state_id: 1,
                status_id: +selectedStatus?.id,
                wheelset_id: selectedWheelset.key
            }).then(()=>{
                GetWarehouseByStoreId(token.access, selectedWarehouse.id.toString()).then((res)=>{
                    dispatch(setWSList(res));
                });
                message.success('Отправили на КП');
            }).catch(errorHandler);
        }
    };
    return (
        <BackgroundPaper>
            <div style={{display: 'flex'}}>
                <ComboBox 
                    fullWidth={'300px'}
                    label={'Выберите вид ремонта'} 
                    options={RepairTypeOptions}
                    value={
                        repairType ? RepairTypeOptions[1] : RepairTypeOptions[0]
                    }
                    onChange={(value) => {
                        setRepairType(!!value?.id);
                    }}
                />
                <ComboBox 
                    fullWidth={'300px'}
                    label={'Выберите Склад'} 
                    options={warehouseList}
                    value={selectedWarehouse}
                    onChange={(value) => {
                        dispatch(setSelectedWS(value));
                        if (value?.id){
                            GetWarehouseByStoreId(token.access, value.id.toString()).then((res)=>{
                                dispatch(setWSList(res));
                            });
                        }
                    }}
                />
                <ComboBox 
                    fullWidth={'300px'}
                    label={'Выберите статус'}
                    options={statusesList}
                    value={selectedStatus}
                    onChange={(value) => {
                        if (value?.id && (statusesList.filter(item => item.id === value.id).length === 1)){
                            selectStatus(statusesList.filter(item => item.id === value.id)[0]);
                        }
                    }}
                />
                <CustomCheckBtn onClick={sendRepair} mr={false}/>
            </div>
            {!!selectedWheelset?.key && <FromRepair 
                selectedWheelset={selectedWheelset} 
                selectWheelset={selectWheelset} 
            />}
            <EditableTable ws={convertedWS2} selectionType={'radio'} onChange={(_a, _b) => {
                if (_b?.length > 0) {
                    selectWheelset(_b[0]);
                } else {
                    selectWheelset(null);
                }
            }}/>
        </BackgroundPaper>
    );
};

export default RepairAction;