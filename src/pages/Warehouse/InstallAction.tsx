import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WAREHOUSE_ACTION } from '../../constants/pages';
import CheckIcon from '@mui/icons-material/Check';
import BackgroundPaper from '../../layout/BackgroundPaper';
import CustomTextField from '../../components/CustomTextField';
import { OutlinedButton, TextButton } from '../../components/BaseComponents/CustomButtons';

interface IInstallAction {
  switchPage: (value: string) => void
}

const InstallAction: React.FC<IInstallAction> = ({switchPage}) => {

  return (
    <BackgroundPaper>
      <div style={{marginRight: '16px', marginBottom: '16px'}}>
        <TextButton onClick={()=>{switchPage(WAREHOUSE_ACTION);}} >
          <ArrowBackIcon />
        </TextButton>
      </div>
      <CustomTextField label={'Номер вагона'}/>
      <div style={{marginLeft: '16px', display: 'inline-block'}}>
        <OutlinedButton>
          <CheckIcon color="success"/> 
        </OutlinedButton>
      </div>
    </BackgroundPaper>
  );
};

export default InstallAction;