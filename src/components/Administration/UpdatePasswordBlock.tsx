// import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react';
// import { ContainedButton } from '../CustomButtons';
// import ComboBox from '../ComboBox';
import CustomTextField from '../CustomTextField';
import { IComboBoxOption } from '../../interfaces';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IUpdatePassword } from '../../api/CustomAPIModel';
import { IUser } from '../../store/user/types';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { UpdatePassword } from 'src/api/CustomAPI';

interface IUpdatePasswordBlock {
  expanded: string | false;
  handlePanelChange: (value: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  setAlertText: (value: string) => void;
  setOpen: (value: boolean) => void;
  users: IUser[];
}

const UpdatePasswordBlock: React.FC<IUpdatePasswordBlock> = ({
  expanded,
  handlePanelChange,
  setAlertText,
  setOpen,
  users,
}) => {
  const token = useSelector((state: IRootState) => state.token.data);
  const [selectedUser, setSelectedUser] = React.useState<IComboBoxOption | null>(null);
  const [passwords, setPasswords] = React.useState<IUpdatePassword>({
    new_password: '',
    repeat_password: '',
    uuid: ''
  });
  const updatePasswordClick = async () => {
    if (
      selectedUser?.id && 
      passwords.new_password &&
      passwords.repeat_password && 
      passwords.new_password === passwords.repeat_password
    ){
      UpdatePassword(token.access, {...passwords, uuid: users[selectedUser.id].uuid});
      setAlertText('Пароль обновлен');
      setOpen(true);
    } else {
      if (!selectedUser?.id) {
        console.log('Вы не выбрали пользователя');
      } else if (!passwords.new_password) {
        console.log('Вы не ввели пароль');
      } else if (!passwords.repeat_password) {
        console.log('Вы не ввели пароль повторно');
      } else if (passwords.new_password !== passwords.repeat_password) {
        console.log('пароли не совпадают');
      }
    }
  };

  return (
    <div>
      UpdatePasswordBlock
    </div>
    // <Accordion 
    //   expanded={expanded === 'panel4'} 
    //   onChange={handlePanelChange('panel4')}
    // >
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel2bh-content"
    //     id="panel2bh-header"
    //   >
    //     <Typography sx={{ flexShrink: 0 }}>Изменить пароль</Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px', paddingTop: '0px' }}>
    //       <ComboBox 
    //         label={'Выберите пользователя'} 
    //         options={users.map((item, idx)=>({id: idx, label: item.surname + ' '+ item.name}))}
    //         value={selectedUser}
    //         setValue={setSelectedUser}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Пароль'} 
    //         type={'password'}
    //         onTextChange={(new_password) => {
    //           setPasswords({...passwords, new_password});
    //         }}
    //         value={passwords.new_password}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Повторите пароль'} 
    //         type={'password'}
    //         onTextChange={(repeat_password) => {
    //           setPasswords({...passwords, repeat_password});
    //         }}
    //         value={passwords.repeat_password}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ContainedButton  
    //         text="Подтвердить" 
    //         onClick={updatePasswordClick}
    //         disabled={
    //           !(selectedUser && selectedUser.label.length > 0) ||
    //           !(passwords.new_password.length > 0) ||
    //           !(passwords.repeat_password.length > 0) ||
    //           !(passwords.repeat_password === passwords.new_password)
    //         } 
    //       />
    //     </div>
    //   </AccordionDetails>
    // </Accordion>
  );
};

export default UpdatePasswordBlock;