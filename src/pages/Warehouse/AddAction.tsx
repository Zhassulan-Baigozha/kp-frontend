import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { WAREHOUSE_ACTION } from '../../constants/pages';
import CheckIcon from '@mui/icons-material/Check';
import BackgroundPaper from '../../layout/BackgroundPaper';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { GridColumns } from '../../constants/MainDataGrid/GridColumns';
import ComboBox, { IComboBoxOption } from '../../components/ComboBox';
import CustomTextField from '../../components/CustomTextField';
import { AddActionTypeNames } from '../../constants/AddActionTypeNames';
import ColumnTypesGrid from '../../constants/ColumnTypesGrid';

interface IAddAction {
  switchPage: (value: string) => void
}
interface IFields { 
  id: number, 
  receiptDate: number, 
  carNum: string, 
  type: string, 
  wheelPairNum: string, 
  manufacturerStamp: string, 
  yearOfManufacture: number, 
  CKKLeft: number, 
  CKKRight: number, 
  rimThicknessLeft: number, 
  rimThicknessRight: number, 
  ridgeThicknessLeft: number, 
  ridgeThicknessRight: number, 
  wheelPairType: string, 
  note: string, 
}

const AddAction: React.FC<IAddAction> = ({switchPage}) => {
  const [typeOfAdding, setToggleTypeOfAdding] = React.useState<IComboBoxOption | null>(AddActionTypeNames[0]);
  const columns: GridColDef = 
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            variant="text"
            color="primary"
            size="small"
            style={{ textAlign: 'left' }}
          >
            <AddIcon color='success' onClick={()=>{
              console.log(params);
              setRows([
                ...rows,
                {
                  id: rows.length + 1, 
                  receiptDate: new Date().getFullYear(),
                  carNum: '', 
                  type: '', 
                  wheelPairNum: '', 
                  manufacturerStamp: '', 
                  yearOfManufacture: new Date().getFullYear(), 
                  CKKLeft: 0, 
                  CKKRight: 0, 
                  rimThicknessLeft: 0, 
                  rimThicknessRight: 0, 
                  ridgeThicknessLeft: 0, 
                  ridgeThicknessRight: 0, 
                  wheelPairType: '', 
                  note: '', 
                },
              ]);
            }}/>
          </Button>
        );
      },
    };
  const bufColumn = GridColumns;
  bufColumn.push(columns);
  
  const [rows, setRows] = React.useState<IFields[]>([
    {
      id: 1, 
      receiptDate: new Date().getFullYear(),
      carNum: '', 
      type: '', 
      wheelPairNum: '', 
      manufacturerStamp: '', 
      yearOfManufacture: new Date().getFullYear(),
      CKKLeft: 0, 
      CKKRight: 0, 
      rimThicknessLeft: 0, 
      rimThicknessRight: 0, 
      ridgeThicknessLeft: 0, 
      ridgeThicknessRight: 0, 
      wheelPairType: '', 
      note: 'фывфыв', 
    },
  ]);

  return (
    <BackgroundPaper>
      <div style={{ paddingBottom: '16px'}}>
        <Button variant="outlined" style={{marginRight: '16px', border: 'none'}} onClick={()=>{switchPage(WAREHOUSE_ACTION);}}>
          <ArrowBackIcon /> 
        </Button>
      </div>
      <div style={{ paddingBottom: '16px'}}>
        <ComboBox 
          label={'Выберите формат добавления'} 
          options={AddActionTypeNames}
          value={typeOfAdding}
          setValue={setToggleTypeOfAdding}
          onChange={(value)=>{console.log('value', value);}}
        />
      </div>
      {typeOfAdding?.id !== 3 && (
        <div style={{ paddingBottom: '16px'}}>
          <CustomTextField label={'Номер вагона'}/>
          <Button variant="outlined" style={{marginLeft: '16px', height: '40px'}} >
            <CheckIcon color="success"/> 
          </Button>
        </div>
      )}
      <div style={{ height: 400, width: '100%' }}>
        <ColumnTypesGrid columns={bufColumn} rows={rows} setRows={setRows}/>
      </div>
    </BackgroundPaper>
  );
};

export default AddAction;