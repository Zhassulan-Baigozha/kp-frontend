import { SignUp } from 'src/api/CustomAPI';
import React from 'react';
import CustomTextField from '../CustomTextField';
import { IComboBoxOption, ISignUpRequest } from 'src/interfaces';
// import { ContainedButton } from '../CustomButtons';
// import ComboBox from '../ComboBox';
// import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { validateEmail } from 'src/utils/validateEmail';

interface ICreateNewEmployee {
  expanded: string | false;
  handlePanelChange: (value: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  setAlertText: (value: string) => void;
  setOpen: (value: boolean) => void;
}

const CreateNewEmployee: React.FC<ICreateNewEmployee> = ({
  expanded,
  handlePanelChange,
  setAlertText,
  setOpen,
}) => {
  const token = useSelector((state: IRootState) => state.token.data);
  const offices = useSelector((state: IRootState) => state.offices.data);
  const roles = useSelector((state: IRootState) => state.roles.data);
  const [value, setValue] = React.useState<IComboBoxOption | null>(null);
  const [emailErrorStatus, setEmailErrorStatus] = React.useState<boolean>(false);
  const [newUser, setNewUser] = React.useState<ISignUpRequest>({
    email: '',
    name: '',
    office: null,
    password: '',
    position: '',
    repeat_password: '',
    roles: '',
    surname: '',
  });
  const signUpOnClick = () => {
    if (
      newUser.email &&
      newUser.name &&
      ((typeof newUser.office) === 'number') &&
      newUser.password &&
      newUser.position &&
      newUser.repeat_password &&
      newUser.roles &&
      newUser.surname
    ) {
      SignUp(token.access, newUser)
        .then((res) => {
          setAlertText('Сотрудник зарегистрирован');
          setOpen(true);
        })
        .catch((err) => {
          console.error('err', err);
        });
    }
  };
  return (
    <div>
      CreateNewEmployee
    </div>
    // <Accordion 
    //   expanded={expanded === 'panel1'} 
    //   onChange={handlePanelChange('panel1')}
    // >
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1bh-content"
    //     id="panel1bh-header"
    //   >
    //     <Typography sx={{ flexShrink: 0 }}>
    //       Создать пользователя
    //     </Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px', paddingTop: '0px' }}>
    //       <CustomTextField 
    //         label={'Имя'}
    //         onTextChange={(name) => {
    //           setNewUser({...newUser, name});
    //         }}
    //         value={newUser.name}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Фамилия'}
    //         onTextChange={(surname) => {
    //           setNewUser({...newUser, surname});
    //         }}
    //         value={newUser.surname}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Должность'}
    //         onTextChange={(position) => {
    //           setNewUser({...newUser, position});
    //         }}
    //         value={newUser.position}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Почта'} 
    //         type={'email'} 
    //         error={emailErrorStatus}
    //         onTextChange={(email) => {
    //           setNewUser({...newUser, email});
    //           setEmailErrorStatus(!validateEmail(newUser.email));
    //         }}
    //         value={newUser.email}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ComboBox 
    //         label={'Роль'} 
    //         options={roles}
    //         value={value}
    //         setValue={setValue}
    //         onChange={(value) => {
    //           if (value?.name){
    //             setNewUser({...newUser, roles: value.name});
    //           }
    //         }}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ComboBox 
    //         label={'Офис'} 
    //         options={offices.map((item)=>({id: item.id, label: item.name}))}
    //         value={
    //           offices
    //             .map((item)=>({...item, label: item.name}))
    //             .filter((item)=>newUser.office === item.id).length === 1 ? 
    //             offices
    //               .map((item)=>({...item, label: item.name}))
    //               .filter((item)=>newUser.office === item.id)[0]
    //             : null
    //         }
    //         onChange={(office)=>{
    //           if (office?.id){
    //             setNewUser({...newUser, office: office.id});
    //           }
    //         }}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Пароль'} 
    //         type={'password'}
    //         onTextChange={(password) => {
    //           setNewUser({...newUser, password});
    //         }}
    //         value={newUser.password}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Повторите пароль'} 
    //         type={'password'}
    //         onTextChange={(repeat_password) => {
    //           setNewUser({...newUser, repeat_password});
    //         }}
    //         value={newUser.repeat_password}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ContainedButton 
    //         text="Зарегистрировать" 
    //         onClick={signUpOnClick}
    //         disabled={
    //           !(newUser && (typeof (newUser.office) === 'number')) ||
    //           !(newUser && newUser.roles.length > 0) ||
    //           !(newUser && newUser.email.length > 0) ||
    //           !(newUser && newUser.surname.length > 0) ||
    //           !(newUser && newUser.name.length > 0) ||
    //           !(newUser && newUser.position.length > 0) ||
    //           !(newUser.password.length > 0) ||
    //           !(newUser.repeat_password.length > 0) ||
    //           !(newUser.repeat_password === newUser.password)
    //         } 
    //       />
    //     </div>
    //   </AccordionDetails>
    // </Accordion>
  );
};

export default CreateNewEmployee;