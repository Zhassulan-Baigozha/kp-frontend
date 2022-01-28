import { GetStatuses, GetTransportList, GetWarehouse, SignIn } from 'src/api/CustomAPI';
import React, { useState } from 'react';
import CustomTextField from 'src/components/base/CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData } from 'src/store/token/actions';
import { IRootState } from 'src/store';
import { primaryColor } from 'src/constants/primaryColor';
import CustomPasswordField from 'src/components/CustomPasswordField';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';
import { WAREHOUSE_ACTION } from 'src/layout/pages';
import { setWarehouseList } from 'src/store/warehouse/actions';
import { setTransportList } from 'src/store/transportList/actions';
import { setAllStatusesList } from 'src/store/allStatuses/actions';
import { IStatusesTable } from 'src/store/allStatuses/types';
import { convertWs } from 'src/utils/convert';

interface ILogin {
    login: string,
    password: string,
}
interface ISignInPage {
    switchPage: (value: string) => void
}

const SignInPage: React.FC<ISignInPage> = ({ switchPage }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: IRootState) => state.token.data);
    const [user, setUser] = useState<ILogin>({
        login: 'marat.ggg@gmail.com',
        password: 'string',
    });

    const SignInOnClick = () => {
        SignIn(token.access,{ 
            email: user.login, 
            password: user.password, 
        })
            .then(async (res) => {
                // if (!res.access_token) {
                //     message.error('Обновите страницу и попробуйте перезайти, или обратитесь к администратору');
                //     return;
                // }
                
                const access_token = 'Bearer ' + res.access_token;
                dispatch(setTokenData({
                    access: access_token,
                    refresh: res.refresh,
                }));
                const GetWarehouseResponse = await GetWarehouse(access_token);
                switchPage(WAREHOUSE_ACTION);
                dispatch(setWarehouseList(GetWarehouseResponse.map((item) =>({id: item.id, label: item.name}))));
                console.log('GetWarehouseResponse', );
                // const GetTransportListResponse = await GetTransportList(access_token);
                // dispatch(setTransportList(GetTransportListResponse));

                // const GetAllUsrResponse = await GetAllUsr(access_token);
                // const GetOfficesResponse = await GetOffices(access_token);
                // console.log('GetRolesResponse', GetRolesResponse);
                // console.log('GetAllUsrResponse', GetAllUsrResponse);
                // console.log('GetOfficesResponse', GetOfficesResponse);
                // console.log('GetStatusesResponse', GetStatusesResponse);
                // console.log('GetTransportListResponse', GetTransportListResponse);
                // dispatch(setOfficesList(GetOfficesResponse));
                // dispatch(setRolesList(GetRolesResponse.map((item) => ({ ...item, label: item.name }))));
                // dispatch(setAllUsersList(GetAllUsrResponse));
                
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
                    v 2.35
                </div>
            </div>
        </div>
    );
};

export default SignInPage;