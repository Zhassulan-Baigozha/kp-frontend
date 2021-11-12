import React from 'react';
import { ContainedButton, OutlinedButton } from '../components/BaseComponents/CustomButtons';
import { SignIn } from '../api/CustomAPI';
import CustomTextField from '../components/CustomTextField';
import { IPages } from '../interfaces';



const ChangePassword: React.FC<IPages> = ({
  switchPage,
}) => {
  const SignInOnClick = () => {
    SignIn({
      'email': 'marat.ggg@gmail.com',
      'password': 'string'
    }).then((r) => {
      console.log(r);
    });
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
        height: '152px',
      }}>
        <div style={{ paddingBottom: '16px' }}>
          <CustomTextField label={'Логин'}/>
        </div>
        <div style={{ paddingBottom: '16px' }}>
          <CustomTextField label={'Пароль'} type={'password'}/>
        </div>
        <div>
          <div style={{
            float: 'left',
            display: 'inline-block',
          }}>
            <OutlinedButton onClick={SignInOnClick} text='Забыли пароль' />
          </div>
          <div style={{
            float: 'right',
            display: 'inline-block',
          }}>
            <ContainedButton onClick={SignInOnClick} text='Войти' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;