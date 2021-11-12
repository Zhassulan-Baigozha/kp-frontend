import React from 'react';
import { useSelector } from 'react-redux';
import { IPages } from '../interfaces';
import { IRootState } from '../store';
// import { ContainedButton } from 'src/componentsNew/BaseComponents/CustomButtons';
import CustomTextField from '../components/CustomTextField';
import ComboBox, { IComboBoxOption } from '../components/ComboBox';
import { ContainedButton } from '../components/CustomButtons';

const top100Films:IComboBoxOption[] = [
  {id: 1, label: 'Администратор'},
  {id: 2, label: 'Пользователя склада - 1'},
];

const ProfilePage: React.FC<IPages> = () => {
  const [value, setValue] = React.useState<IComboBoxOption | null>(top100Films[0]);
  const userData = useSelector((state: IRootState) => state.user.data);
  console.log('userData = ', userData);
  const validateEmail = (mail: string) => {
    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mail.match(mailformat))
    {
      return (true);
    }
    return (false);
  };

  return (
    <div style={{
      width: '364px',
      margin: '0 auto',
      paddingTop: '32px',
      position: 'relative',
      top: '80px',
    }}>
      <div style={{
        padding: '32px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        margin:'auto',
        height: '432px',
      }}>
        <div style={{ paddingBottom: '16px' }}>
          <CustomTextField 
            label={'Имя'}
            onChange={(item) => {
              console.log('item = ', item);
            }}
            value={userData.name}
          />
        </div>
        <div style={{ paddingBottom: '16px' }}>
          <CustomTextField label={'Фамилия'}/>
        </div>
        <div style={{ paddingBottom: '16px' }}>
          <CustomTextField label={'Почта'} type={'email'} validationFn={validateEmail}/>
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
      </div>
    </div>
  );
};

export default ProfilePage;