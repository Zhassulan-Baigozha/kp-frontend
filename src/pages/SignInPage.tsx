import { SignIn } from 'src/api/CustomAPI';
import React, { useState } from 'react';
import CustomTextField from 'src/components/CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData } from 'src/store/token/actions';
import { IRootState } from 'src/store';
import { primaryColor } from 'src/constants/primaryColor';
import CustomPasswordField from 'src/components/CustomPasswordField';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';

interface ILogin {
  login: string,
  password: string,
}

const SignInPage: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: IRootState) => state.token.data);
  const [user, setUser] = useState<ILogin>({
    login: 'marat.ggg@gmail.com',
    password: 'string',
  });

  const SignInOnClick = () => {
    console.log('SignInOnClick');
    SignIn(token.access,{ 
      email: user.login, 
      password: user.password, 
    })
      .then((res) => {
        if (res.access_token && res.refresh){
          dispatch(setTokenData({
            access: 'Bearer ' + res.access_token,
            refresh: res.refresh,
          }));
        }
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
        height: '265px',
      }}>
        <div style={{ 
          display: 'block',
          paddingBottom: '16px',
          textAlign: 'center',
          color: primaryColor,
          opacity: 0.5,
        }}>
          Для изменения пароля без авторизации обратитесь к администратору
        </div>
        <CustomTextField 
          placeholder={'Логин'} 
          value={user.login} 
          onChange={(value) => {
            setUser({...user, login: value.target.value});
          }}
        />
        <CustomPasswordField 
          placeholder={'Пароль'} 
          value={user.password} 
          onChange={(value) => {
            setUser({...user, password: value.target.value});
          }}
        />
        <div style={{ width: '100%' }}>
          <CustomBlockBtn onClick={SignInOnClick} >
            Войти 
          </CustomBlockBtn>
        </div> 
        <div style={{ 
          display: 'block',
          paddingBottom: '8px',
          textAlign: 'right',
          color: primaryColor,
          opacity: 0.5,
        }}>
          v 2.006
        </div>
      </div>
    </div>
  );
};

export default SignInPage;