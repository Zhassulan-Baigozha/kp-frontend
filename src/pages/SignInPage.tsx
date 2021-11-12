// import { SignIn } from '@api/CustomAPI';
// import { cookieSetToken } from '@utils/cookieSetData';
// import Cookies from 'js-cookie';
// import { ISignInResponse } from "../api/CustomAPIModel";

import CustomTextField from '../components/CustomTextField';
import React, { useEffect } from 'react';
import { FORGOT_PASSWORD, WAREHOUSE_ACTION } from "../constants/pages";
import { IPages } from "../interfaces";
import { ContainedButton, OutlinedButton } from '../components/BaseComponents/CustomButtons';
import { SignIn } from '../api/CustomAPI';
import { ISignInResponse } from '../api/CustomAPIModel';
import { cookieSetToken } from '../utils/cookieSetData';

interface ISignInPage extends IPages{
  setAuthorized: (value:boolean) => void;
}

const SignInPage: React.FC<ISignInPage> = ({
  setAuthorized,
  switchPage,
}) => {
  const SignInOnClick = () => {
    SignIn({
      'email': 'marat.ggg@gmail.com',
      'password': 'string'
    }).then((r: ISignInResponse) => {
      cookieSetToken('auth_user_token', 'Bearer ' + r.access_token);
      setAuthorized(true);
    });
  };

  const GoToForgotPassword = () => {
    // switchPage(FORGOT_PASSWORD);
  };

  const checkAuthorization = async () => {
    // SignIn({
    //   'email': 'marat.ggg@gmail.com',
    //   'password': 'string'
    // }).then((r: ISignInResponse) => {
    //   cookieSetToken('auth_user_token', 'Bearer ' + r.access_token);
    // });
    // const result = await Cookies.get('auth_user_token');
    // console.log('Sign in checkAuthorization = ', result);
    // switchPage(WAREHOUSE_ACTION);
  };

  // useEffect(() => {
  //   checkAuthorization();
  // },[]);

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
          <CustomTextField label={'Логин'} />
        </div>
        <div style={{ paddingBottom: '16px' }}>
          <CustomTextField label={'Пароль'} type={'password'}/>
        </div>
        <div>
          <div style={{
            float: 'left',
            display: 'inline-block',
          }}>
            <OutlinedButton onClick={GoToForgotPassword} text='Забыли пароль' />
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

export default SignInPage;