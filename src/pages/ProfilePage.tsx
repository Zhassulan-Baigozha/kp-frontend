import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextField from 'src/components/base/CustomTextField';
import { IRootState } from 'src/store';
import { Collapse, message } from 'antd';
import { IUpdatePassword } from 'src/api/CustomAPIModel';
import { validateEmail } from 'src/utils/validateEmail';
import { UpdatePassword, UpdateUserData } from 'src/api/CustomAPI';
import CollapseElemLayout from 'src/layout/CollapseElemLayout';
import CollapseLastElemLayout from 'src/layout/CollapseLastElemLayout';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';
import { setUserData } from 'src/store/data/actions';

const ProfilePage: React.FC = () => {
    const { Panel } = Collapse;
    const token = useSelector((state: IRootState) => state.token.data);
    const userData = useSelector((state: IRootState) => state.data.user);
    const dispatch = useDispatch();
    const [emailErrorStatus, setEmailErrorStatus] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<IUpdatePassword>({
        new_password: '',
        repeat_password: '',
        uuid: '',
    });

    const updatePasswordClick = async () => {
        await UpdatePassword(token.access, {...passwords, uuid: userData.uuid});
        message.success('Данные успешно обновлены');
    };

    const updateUserClick = async () => {
        await UpdateUserData(token.access, userData);
        message.success('Данные успешно обновлены');
    };

    return (
        <>
            <div style={{
                width: '400px',
                margin: '0 auto',
                paddingTop: '32px',
                position: 'relative',
                top: '80px',
            }}>
                <Collapse accordion>
                    <Panel header="Изменить свои данные" key="1">
                        <CollapseElemLayout>
                            <CustomTextField 
                                placeholder={'Имя'}
                                value={userData.name}
                                fullWidth={true}
                                onChange={(value) => {
                                    dispatch(setUserData({...userData, name: value.target.value}));
                                }}
                            />
                        </CollapseElemLayout>
                        <CollapseElemLayout>
                            <CustomTextField 
                                placeholder={'Фамилия'}
                                onChange={(value) => {
                                    dispatch(setUserData({...userData, surname: value.target.value}));
                                }}
                                value={userData.surname}
                                fullWidth={true}
                            />
                        </CollapseElemLayout>
                        <CollapseElemLayout>
                            <CustomTextField 
                                placeholder={'Почта'} 
                                type={'email'} 
                                style={{width: '100%'}}
                                error={emailErrorStatus}
                                onChange={(value) => {
                                    dispatch(setUserData({...userData, email: value.target.value}));
                                    setEmailErrorStatus(!validateEmail(userData.email));
                                }}
                                value={userData.email}
                                fullWidth={true}
                            />
                        </CollapseElemLayout>
                        <CollapseLastElemLayout>
                            <CustomBlockBtn onClick={updateUserClick} disabled={
                                !(userData.name.length > 0) ||
                                !(userData.email.length > 0) ||
                                !(userData.surname.length > 0) ||
                                emailErrorStatus
                            }>
                                Обновить 
                            </CustomBlockBtn>
                        </CollapseLastElemLayout>
                    </Panel>
                    <Panel header="Изменить пароль" key="2">
                        <CollapseElemLayout>
                            <CustomTextField 
                                placeholder={'Пароль'} 
                                type={'password'}
                                onChange={(value) => {
                                    setPasswords({...passwords, new_password: value.target.value});
                                }}
                                value={passwords.new_password}
                                fullWidth={true}
                            />
                        </CollapseElemLayout>
                        <CollapseElemLayout>
                            <CustomTextField 
                                placeholder={'Повторите пароль'} 
                                type={'password'}
                                onChange={(value) => {
                                    setPasswords({...passwords, repeat_password: value.target.value});
                                }}
                                value={passwords.repeat_password}
                                fullWidth={true}
                            />
                        </CollapseElemLayout>
                        <CollapseLastElemLayout>
                            <CustomBlockBtn onClick={updatePasswordClick} disabled={
                                !(passwords.new_password.length > 0) ||
                                !(passwords.repeat_password.length > 0) ||
                                !(passwords.repeat_password === passwords.new_password)
                            }>
                                Подтвердить 
                            </CustomBlockBtn>
                        </CollapseLastElemLayout>
                    </Panel>
                </Collapse>
            </div>
        </>
    );
};

export default ProfilePage;