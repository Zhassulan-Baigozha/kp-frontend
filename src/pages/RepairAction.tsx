import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IComboBoxOption } from 'src/interfaces';
import { IGetRepairWSResponse, IGridData, IRepairWSUpdateRequest } from 'src/api/CustomAPIModel';
import { GetWSByWarehouse, RepairWSChangeStatus, RepairWSUpdate } from 'src/api/CustomAPI';
import BackgroundPaper from '../layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import { message } from 'antd';
import useWarehouseList from 'src/hooks/useWarehouseList';
// import ComboBox from 'src/components/ComboBox';
// import WSTable from 'src/components/WSTable';
// import { Button } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
// import FromRepair from 'src/components/RepairAction_Form/FromRepair';


const RepairAction: React.FC = () => {
    const { warehouseList } = useWarehouseList();
    const token = useSelector((state: IRootState) => state.token.data);
    const statuses = useSelector((state: IRootState) => state.allStatuses.data);
    const statusesList = statuses.map((item) =>({id: item.code, label: item.name}));
    const [selectedStatus, selectStatus] = useState<IComboBoxOption | null>(null);
    const [selectedWarehouse, selectWarehouse] = useState<IComboBoxOption | null>(null);
    const [wheelsetArray, setWheelsetArray] = useState<IGetRepairWSResponse[]>([]);
    const [selectedWheelset, selectWheelset] = useState<IRepairWSUpdateRequest | null>(null);
    const [repairType, setRepairType] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const RepairTypeOption = [{
        id:0, label: 'На ремонт',
    },{
        id:1, label: 'Из ремонта',
    }];

    const [ws, setWS] = useState<IGridData[]>([]);
    const addNewWS = () => {
        if (!selectedWarehouse?.id) { 
            message.error('Вы не выбрали Склад');
            return null; 
        }
        if (!selectedStatus?.id) { 
            message.error('Вы не выбрали Статус');
            return null; 
        }
        if (!selectedItem) { 
            message.error('Вы не выбрали КП');
            return null; 
        }
        if (repairType){
            // Из ремонта
            if (selectedWheelset) {
                RepairWSUpdate(token.access, selectedWheelset)
                    .then((res)=>{
                        message.success('Вы успешно добавили КП');
                    });
            }
        } else {
            // На ремонт
            RepairWSChangeStatus(token.access, {
                description: '',
                state_id: 1,
                status_id: +selectedStatus?.id,
                wheelset_id: selectedItem
            }).then((res)=>{
                message.success('Вы успешно добавили КП');
            });
        }
    };
    return (
        <BackgroundPaper>
            <div style={{display: 'flex'}}>
                <ComboBox 
                    label={'Выберите вид ремонта'} 
                    options={RepairTypeOption}
                    value={
                        repairType ? RepairTypeOption[1] : RepairTypeOption[0]
                    }
                    onChange={(value) => {
                        setRepairType(!!value?.id);
                    }}
                />
                <ComboBox 
                    label={'Выберите Склад'} 
                    options={warehouseList}
                    value={selectedWarehouse}
                    onChange={(value) => {
                        if (
                            value?.id && 
              (warehouseList.filter(item => item.id === value.id).length === 1) &&
              typeof (value?.id) === 'number'
                        ){
                            selectWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
                            GetWSByWarehouse(token.access, value.id)
                                .then((response)=>{
                                    setWheelsetArray(response);
                                    // const ConvertWSResponse = ConvertWS(response.map(item=> item.wheelset));
                                    // setWS(ConvertWSResponse);
                                });
                        }
                    }}
                />
                <ComboBox 
                    label={'Выберите статус'}
                    options={statusesList}
                    value={selectedStatus}
                    onChange={(value) => {
                        if (value?.id && (statusesList.filter(item => item.id === value.id).length === 1)){
                            selectStatus(statusesList.filter(item => item.id === value.id)[0]);
                        }
                    }}
                />
                {/* <Button 
          variant="outlined" 
          style={{height: '40px'}} 
          onClick={addNewWS}>
          <CheckIcon color="success"/> 
        </Button> */}
            </div>
            {/* {selectedWheelset && <FromRepair 
        wheelSetData={selectedWheelset} 
        setWheelSetData={selectWheelset} 
      />} */}
            {/* <WSTable ws={ws} onSelect={(selectedItemsWSTable:number[])=>{
        if (!selectedStatus?.id){ 
          setAlertText('Вы не выбрали Статус');
          setAlertType('error');
          setOpenAlert(true);
          return null 
        }
        if (selectedItemsWSTable.length === 1){
          setSelectedItem(selectedItemsWSTable[0]);
          const temp = wheelsetArray.filter((item: IGetRepairWSResponse) => (
            selectedItemsWSTable[0] === item?.wheelset?.id));
          if (temp?.length === 1) {
            selectWheelset({
              description: temp[0].wheelset.description,
              id: temp[0].wheelset.id,
              status_id: selectedStatus?.id, 
              updated_at: temp[0].wheelset.updated_at,
              wagon: temp[0].wheelset.wagon,
              wheels: temp[0].wheelset.wheels.map((item)=>({
                date_survey: item.date_survey!,
                flange: item.flange!,
                id: item.id!,
                rim: item.rim!,
                status: item.status!,
                wheelset_id: temp[0].wheelset.id!,
              }))?.length > 0 
              ? temp[0].wheelset.wheels.map((item)=>({
                date_survey: item.date_survey!,
                flange: item.flange!,
                id: item.id!,
                rim: item.rim!,
                status: item.status!,
                wheelset_id: temp[0].wheelset.id!,
              }))
              : []
            });
          } else {
            selectWheelset(null);
          }
        }
      }}/> */}
        </BackgroundPaper>
    );
};

export default RepairAction;