import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { ContainedButton } from '../components/BaseComponents/CustomButtons';
import ComboBox, { IComboBoxOption } from '../components/ComboBox';
import CustomTextField from '../components/CustomTextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IPages } from '../interfaces';
import { IUser } from '../store/user/types';

const top100Films:IComboBoxOption[] = [
  {id: 1, label: 'Администратор'},
  {id: 2, label: 'Пользователя склада - 1'},
];


const Administration: React.FC<IPages> = () => {
  const [value, setValue] = React.useState<IComboBoxOption | null>(top100Films[0]);
  const [userData, setUserData] = React.useState<IUser | null>(null);
  const [name, setName] = React.useState<string>('');

  const validateEmail = (mail: string) => {
    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.match(mailformat))
    {
      return (true);
    }
    return (false);
  };

  useEffect(() => {
    // GetUsr().then((res) => {
    //   console.log('GetUsr res   = ', res);
    //   setUserData(res);
    //   setName(res.name);
    // }).catch((err) => {
    //   console.log('GetUsr error = ', err);
    // });
    // GetRoles().then((res:IGetRolesItem[]) => {
    //   console.log(res.map(item => ({
    //     label: item.display_name,
    //     id: item.id
    //   })));
    //   setRoles();
    // });
  }, []);
  

  return (
    <div style={{
      width: '364px',
      margin: '0 auto',
      paddingTop: '32px',
      position: 'relative',
      top: '80px',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        margin:'auto',
        height: '432px',
      }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Создать пользователя</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ paddingBottom: '16px' }}>
              <CustomTextField 
                label={'Имя'} 
                value={name}
                onChange={(item) => {
                  console.log('item = ', item);
                  // userData
                  // userData
                  // setUserData();
                }}
              />
            </div>
            <div style={{ paddingBottom: '16px' }}>
              <CustomTextField 
                label={'Фамилия'} 
                value={userData?.surname}
              />
            </div>
            <div style={{ paddingBottom: '16px' }}>
              <CustomTextField 
                label={'Почта'} 
                type={'email'} 
                value={userData?.email}
                validationFn={validateEmail}
              />
            </div>
            <div style={{ paddingBottom: '16px' }}>
              <ComboBox 
                label={'Роль'} 
                options={top100Films}
                value={value}
                setValue={setValue}
                onChange={(value)=>{
                  console.log('value', value);
                }}
              />
            </div>
            <div style={{ paddingBottom: '16px' }}>
              <ComboBox 
                label={'Должность'} 
                options={top100Films}
                value={value}
                setValue={setValue}
                onChange={(value)=>{
                  console.log('value', value);
                }}
              />
            </div>
            <div style={{ paddingBottom: '16px' }}>
              <CustomTextField label={'Пароль'} type={'password'}/>
            </div>
            <div style={{ paddingBottom: '16px' }}>
              <CustomTextField label={'Повторите пароль'} type={'password'}/>
            </div>
            <div style={{ paddingBottom: '16px' }}>
              <ContainedButton  text="Подтвердить" />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Administration;