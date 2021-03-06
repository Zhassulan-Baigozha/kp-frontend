import { GetWarehouse, SignIn } from 'src/api/CustomAPI';
import React, { useState } from 'react';
import CustomTextField from 'src/components/base/CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData } from 'src/store/token/actions';
import { IRootState } from 'src/store';
import { primaryColor } from 'src/constants/primaryColor';
import CustomPasswordField from 'src/components/base/CustomPasswordField';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';
import { WAREHOUSE_ACTION } from 'src/layout/pages';
import { setWarehouseList } from 'src/store/data/actions';
import { useErrorHandler } from 'src/utils/useErrorHandler';

interface ILogin {
    login: string,
    password: string,
}
interface ISignInPage {
    switchPage: (value: string) => void
}

const SignInPage: React.FC<ISignInPage> = ({ switchPage }) => {
    const { errorHandler } = useErrorHandler();
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
                const access_token = 'Bearer ' + res.access_token;
                dispatch(setTokenData({
                    access: access_token,
                    refresh: res.refresh,
                }));
                const GetWarehouseResponse = await GetWarehouse(access_token);
                switchPage(WAREHOUSE_ACTION);
                dispatch(setWarehouseList(GetWarehouseResponse.map((item) =>({id: item.id, label: item.name}))));
            }).catch(errorHandler);
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
                height: '285px',
            }}>
                <div style={{ 
                    display: 'block',
                    // paddingBottom: '16px',
                    textAlign: 'center',
                    color: primaryColor,
                    opacity: 0.5,
                }}>
                    ?????? ?????????????????? ???????????? ?????? ?????????????????????? ???????????????????? ?? ????????????????????????????
                </div>
                <CustomTextField 
                    placeholder={'??????????'} 
                    value={user.login} 
                    onChange={(value) => {
                        setUser({...user, login: value.target.value});
                    }}
                />
                <CustomPasswordField 
                    placeholder={'????????????'} 
                    value={user.password} 
                    onChange={(value) => {
                        setUser({...user, password: value.target.value});
                    }}
                />
                <div style={{ width: '100%' }}>
                    <CustomBlockBtn onClick={SignInOnClick} >
                        ?????????? 
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