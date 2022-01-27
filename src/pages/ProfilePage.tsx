import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomTextField from 'src/components/base/CustomTextField';
import { ISignUpUser } from 'src/interfaces';
import { IRootState } from 'src/store';
import { Collapse, message } from 'antd';
import { IUpdatePassword } from 'src/api/CustomAPIModel';
import { validateEmail } from 'src/utils/validateEmail';
import { UpdatePassword, UpdateUserData } from 'src/api/CustomAPI';
import CollapseElemLayout from 'src/layout/CollapseElemLayout';
import CollapseLastElemLayout from 'src/layout/CollapseLastElemLayout';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';

const ProfilePage: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const userData = useSelector((state: IRootState) => state.user.data);
    const { Panel } = Collapse;

    const [emailErrorStatus, setEmailErrorStatus] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<IUpdatePassword>({
        new_password: '',
        repeat_password: '',
        uuid: userData.uuid
    });
    const [user, setUser] = useState<ISignUpUser>(userData);

    const updatePasswordClick = async () => {
        await UpdatePassword(token.access, passwords);
        message.success('Данные успешно обновлены');
    };

    const updateUserClick = async () => {
        await UpdateUserData(token.access, user);
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
                                onChange={(value) => {
                                    setUser({...user, name: value.target.value});
                                }}
                                value={user.name}
                                fullWidth={true}
                            />
                        </CollapseElemLayout>
                        <CollapseElemLayout>
                            <CustomTextField 
                                placeholder={'Фамилия'}
                                onChange={(value) => {
                                    setUser({...user, surname: value.target.value});
                                }}
                                value={user.surname}
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
                                    setUser({...user, email: value.target.value});
                                    setEmailErrorStatus(!validateEmail(user.email));
                                }}
                                value={user.email}
                                fullWidth={true}
                            />
                        </CollapseElemLayout>
                        <CollapseLastElemLayout>
                            <CustomBlockBtn onClick={updateUserClick} disabled={
                                !(user.name.length > 0) ||
                  !(user.email.length > 0) ||
                  !(user.surname.length > 0) ||
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