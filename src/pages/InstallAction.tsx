import React, { useState } from 'react';
import { IComboBoxOption, IPages, WagonExistanceType } from 'src/interfaces';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IGridData } from 'src/api/CustomAPIModel';
import { GetWagonById, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import ConvertWS from 'src/utils/ConvertWS';
// import BackgroundPaper from 'src/layout/BackgroundPaper';
// import CheckIcon from '@mui/icons-material/Check';
// import WSTable from 'src/components/WSTable';
// import ComboBox from 'src/components/ComboBox';
// import { Button } from '@mui/material';
// import CustomizedInputBase from 'src/components/CustomizedInputBase';


const InstallAction: React.FC<IPages> = ({switchPage}) => {
  const [wagonBtnDisabled, setWagonBtnDisabled] = React.useState<boolean>(false);
  const warehouse = useSelector((state: IRootState) => state.warehouse.data);
  const statuses = useSelector((state: IRootState) => state.allStatuses.data);
  const token = useSelector((state: IRootState) => state.token.data);
  const [wsWarehouse, setWSWarehouse] = useState<IGridData[]>([]);
  const [wsWagon, setWSWagon] = useState<IGridData[]>([]);
  const warehouseList = warehouse.map((item) =>({id: item.id, label: item.name}));
  const [selectedWarehouse, selectWarehouse] = React.useState<IComboBoxOption | null>(null);
  const [wagonNum, setWagonNum] = React.useState<string>('21206958');
  const [wagonExists, setWagonExists] = React.useState<WagonExistanceType>(null);
  const handleClick = async () => {
    GetWagonById(token.access, wagonNum)
      .then((getWagonByIdResponse) => {
        const ConvertWSResponse = ConvertWS([
          getWagonByIdResponse.wheel_set_first,
          getWagonByIdResponse.wheel_set_second,
          getWagonByIdResponse.wheel_set_third,
          getWagonByIdResponse.wheel_set_fourth
        ], statuses);
        setWSWagon(ConvertWSResponse);
        setWagonBtnDisabled(true);
        setWagonExists('find');
      })
      .catch((err)=>{
        setWSWagon([]);
        setWagonBtnDisabled(true);
        setWagonExists('notFind');
        console.log(err.response.code);
        console.log(err.response.status);
        console.log(err.response.message);
      });
  }
  return (
    <div>
      InstallAction
    </div>
    // <BackgroundPaper>
    //   <div style={{ display: 'flex'}}>
    //     <div style={{ paddingRight: '16px'}}>
    //       <ComboBox 
    //         label={'Выберите Склад'} 
    //         options={warehouseList}
    //         value={selectedWarehouse}
    //         onChange={(value) => {
    //           if (value?.id && (warehouseList.filter(item => item.id === value.id).length === 1)){
    //             selectWarehouse(warehouseList.filter(item => item.id === value.id)[0]);
    //             GetWarehouseByStoreId(token.access, value.id.toString())
    //               .then((response)=>{
    //                 const ConvertWSResponse = ConvertWS(response, statuses);
    //                 setWSWarehouse(ConvertWSResponse);
    //               })
    //           }
    //         }}
    //       />
    //     </div>
    //     <CustomizedInputBase 
    //       value={wagonNum} 
    //       placeholder={'Номер вагона'}
    //       onIconClick={handleClick}
    //       disabled={wagonBtnDisabled}
    //       onTextChange={(value)=>{
    //         setWagonNum(value);
    //         setWagonBtnDisabled(false);
    //         setWagonExists(null);
    //       }}
    //       validate={wagonExists}
    //     />
    //     <Button 
    //       variant="outlined" 
    //       style={{height: '40px'}}
    //       onClick={()=>{}}>
    //       <CheckIcon color="success"/> 
    //     </Button>
    //   </div>
    //   <div style={{
    //     fontFamily: 'Roboto',
    //     fontSize: '24px',
    //     fontStyle: 'normal',
    //     fontWeight: 500,
    //     lineHeight: '42px',
    //     color: theme.palette.primary.main,
    //   }}>
    //     Колесные пары на вагоне
    //   </div>
    //   <WSTable ws={wsWagon} customHeight={227}/>
    //   <div style={{
    //     paddingTop: '16px',
    //     fontFamily: 'Roboto',
    //     fontSize: '24px',
    //     fontStyle: 'normal',
    //     fontWeight: 500,
    //     lineHeight: '42px',
    //     color: theme.palette.primary.main,
    //   }}>
    //     Колесные пары на складе
    //   </div>
    //   <WSTable ws={wsWarehouse}/>
      
    // </BackgroundPaper>
  );
};

export default InstallAction;