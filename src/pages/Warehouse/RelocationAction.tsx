import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackgroundPaper from '../../layout/BackgroundPaper';
import CheckIcon from '@mui/icons-material/Check';
import { WAREHOUSE_ACTION } from '../../constants/pages';
import DataTable1 from '../../components/DataTable1';
import ComboBox, { IComboBoxOption } from '../../components/ComboBox';
import { DeliveryTypes } from '../../constants/DeliveryTypes';
import CustomTextField from '../../components/CustomTextField';
import { OutlinedButton, TextButton } from '../../components/BaseComponents/CustomButtons';

interface IRelocationAction {
  switchPage: (value: string) => void
}

const RelocationAction: React.FC<IRelocationAction> = ({switchPage}) => {
  const [value, setValue] = React.useState<IComboBoxOption | null>(DeliveryTypes[0]);
  return (
    <BackgroundPaper>
      <div style={{marginRight: '16px', marginBottom: '16px'}}>
        <TextButton onClick={()=>{switchPage(WAREHOUSE_ACTION);}}>
          <ArrowBackIcon />
        </TextButton>
      </div>
      <div style={{marginRight: '16px', marginBottom: '16px'}}>
        <CustomTextField label={'Номер вагона'}/>
        <div style={{marginLeft: '16px', display: 'inline-block'}}>
          <OutlinedButton>
            <CheckIcon color="success"/> 
          </OutlinedButton>
        </div>
      </div>
      <div style={{marginRight: '16px', marginBottom: '16px'}}>
        <ComboBox 
          label={'Должность'} 
          options={DeliveryTypes}
          value={value}
          setValue={setValue}
          onChange={(value)=>{console.log('value', value);}}
        />
      </div>
      <DataTable1 ws={[]}/>
    </BackgroundPaper>
  );
};

export default RelocationAction;