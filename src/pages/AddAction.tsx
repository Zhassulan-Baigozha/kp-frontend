import React, { useState } from 'react';
import { IComboBoxOption, TAlertStatus, WagonExistanceType } from 'src/interfaces';
import { AddWSFromWagon, AppendPurchased, GetWagonById, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IAppendPurchasedForm, IGridData } from 'src/api/CustomAPIModel';
import { getCurrentDateString } from 'src/utils/getCurrentDateString';
import { AddActionTypeNames } from 'src/constants/AddActionTypeNames';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import Purchased from 'src/components/AddAction_From/Purchased';
import CustomTextField from 'src/components/base/CustomTextField';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import { Input } from 'antd';
// import WSTable from 'src/components/WSTable';
// import Purchased from 'src/components/AddAction_From/Purchased';
// import CustomizedInputBase from 'src/components/CustomizedInputBase';
// import AlertBox from 'src/components/AlertBox';
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
}

const AddAction: React.FC = () => {
  const token = useSelector((state: IRootState) => state.token.data);
  const [loading, setLoading] = useState<boolean>(false);



  const warehouse = useSelector((state: IRootState) => state.warehouse.data);
  const warehouseList = warehouse.map((item) =>({id: item.id, label: item.name}));
  const [selectedWarehouse, selectWarehouse] = useState<IComboBoxOption | null>(null);
  const [typeOfAdding, setToggleTypeOfAdding] 
  = useState<IComboBoxOption>(AddActionTypeNames[1]);
  const [purchasedWSData, setPurchasedWSData] = useState<IAppendPurchasedForm>(initNewField);

  const statuses = useSelector((state: IRootState) => state.allStatuses.data);
  const [wagonNum, setWagonNum] = useState<string>('21206958');
  const [wagonBtnDisabled, setWagonBtnDisabled] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const [alertStatus, setAlertStatus] = useState<TAlertStatus>('error');
  const [wagonExists, setWagonExists] = useState<WagonExistanceType>(null);
  const [ws, setWS] = useState<IGridData[]>([]);
  const [selectedWS, selectWS] = useState<number | null>(null);
  const selectedWarehousePurchased = 
    warehouseList.filter((item)=>(item.id === purchasedWSData.warehouse_id)).length === 1
    ? warehouseList.filter((item)=>(item.id === purchasedWSData.warehouse_id))[0]
    : null;
  const onSearch = (value: string) => {
    setLoading(true);
    setWagonNum(value);
    //   setWagonBtnDisabled(false);
    //   setWagonExists(null);
    if (typeOfAdding?.id === 1 && wagonNum?.length === 8){
      GetWagonById(token.access, value)
        .then((getWagonByIdResponse) => {
          // const ConvertWSResponse = ConvertWS([
          // getWagonByIdResponse.wheel_set_first,
          // getWagonByIdResponse.wheel_set_second,
          // getWagonByIdResponse.wheel_set_third,
          // getWagonByIdResponse.wheel_set_fourth
          // ]);
          // setWS(ConvertWSResponse);
          // setWagonBtnDisabled(true);
          // setWagonExists('find');
        })
        .catch((err)=>{
          // setWS([]);
          // setWagonBtnDisabled(true);
          // setWagonExists('notFind');
          // console.log(err.response.code);
          // console.log(err.response.status);
          // console.log(err.response.message);
        })
        .finally(()=>{
          setLoading(false);
        });
    }
  };
  const handleClick = async () => {

    
  }

  const addNewWS1 = () => {
    if (!selectedWarehouse?.id){ 
      setAlertText('Вы не выбрали Склад');
      setAlertStatus('error');
      setOpenAlert(true);
      return null 
    }
    if (wagonNum.length === 0){ 
      setAlertText('Вы не выбрали Вагон');
      setAlertStatus('error');
      setOpenAlert(true);
      return null 
    }
    if (selectedWS === null){ 
      setAlertText('Вы не выбрали Вагон');
      setAlertStatus('error');
      setOpenAlert(true);
      return null 
    }
    AddWSFromWagon(token.access, {
      wagon_id: +wagonNum, 
      description: '',
      warehouse_id: +selectedWarehouse.id,
      ws_list: [selectedWS]
    }).then((res)=>{
      setAlertText('Вы успешно добавили КП');
      setAlertStatus('success');
      setOpenAlert(true);
    }).catch((err) => {
      console.log(err);
    })
  }

  const addNewWS2 = () => {
    console.log('addNewWS2');
  }

  const addNewWSType3 = () => {
    const temp = {
      date_survey: purchasedWSData.date_survey + 'T00:00:00Z',
      description: purchasedWSData.description,
      manufacturer_code: purchasedWSData.manufacturer_code ? purchasedWSData.manufacturer_code : 0,
      number: purchasedWSData.number,
      status: 1,
      warehouse_id: purchasedWSData.warehouse_id,
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
    .then((res)=>{
      setAlertText('Вы успешно добавили КП');
      setAlertStatus('success');
      setOpenAlert(true);
    })
    .catch((err)=>{
      console.error(err);
      setAlertText('Произошла ошибка. Попробуйте перезагрузить страницу и попробуйте снова.');
      setAlertStatus('error');
      setOpenAlert(true);
    });
  }

  return (
    <BackgroundPaper>
      <div style={{display: 'flex'}}>
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
                if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)){
                  selectWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
                }
              }}
            />
            <Search 
              placeholder={'Номер вагона'}
              value={wagonNum} 
              disabled={wagonBtnDisabled}
              onSearch={onSearch} 
              style={{ width: 300, marginRight: '16px' }} 
              onChange={(value)=>{
                setWagonNum(value.target.value);
              }}
              // validate={wagonExists}
              loading={loading}
            />
            
            <CustomCheckBtn onClick={addNewWS1} />
          </>
        )}
        {typeOfAdding?.id === 2 &&
          (
            <>
              <CustomTextField 
                placeholder={'Номер транспорта'} 
                fullWidth={false}
              />
              <ComboBox 
                fullWidth={false}
                label={'Выберите Склад'} 
                options={warehouseList}
                value={selectedWarehouse}
                onChange={(value) => {
                  if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)){
                    selectWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
                    GetWarehouseByStoreId(token.access, value.id.toString())
                      .then((response)=>{
                        // const ConvertWSResponse = ConvertWS(response);
                        // setWS(ConvertWSResponse);
                      })
                  }
                }}
              />
              <CustomCheckBtn onClick={addNewWS2}/>
            </>
          )
        }
        {(typeOfAdding?.id === 3) && (
          <>
            <ComboBox 
              fullWidth={false}
              label={'Выберите Склад'} 
              options={warehouseList}
              value={selectedWarehousePurchased}
              onChange={(value) => {
              
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
      { typeOfAdding?.id === 3 && (
        <Purchased purchasedWSData={purchasedWSData} setPurchasedWSData={setPurchasedWSData} />
      )}
      {/* { typeOfAdding?.id !== 3 && ws.length > 0 && <WSTable ws={ws} 
        onSelect={(selectedItemsWSTable:number[])=>{
          if (selectedItemsWSTable?.length > 0){
            selectWS(selectedItemsWSTable[0]);
            console.log(
              ws.map((item) =>{
                console.log(item);
                return item;
              })
            );
          }
        }}
        /> }  */}
    </BackgroundPaper>
  );
};

export default AddAction;