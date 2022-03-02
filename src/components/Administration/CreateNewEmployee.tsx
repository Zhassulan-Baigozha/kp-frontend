import { SignUp } from 'src/api/CustomAPI';
import React, { useState } from 'react';
import CustomTextField from '../base/CustomTextField';
import { ISignUpRequest } from 'src/interfaces';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { validateEmail } from 'src/utils/validateEmail';
import { Collapse, message } from 'antd';
import CollapseElemLayout from 'src/layout/CollapseElemLayout';
import CollapseLastElemLayout from 'src/layout/CollapseLastElemLayout';
import { CustomBlockBtn } from '../base/CustomBtn';
import ComboBox from '../base/ComboBox';
import { useErrorHandler } from 'src/utils/useErrorHandler';


const CreateNewEmployee: React.FC = () => {
    const { errorHandler } = useErrorHandler();
    const { Panel } = Collapse;
    const token = useSelector((state: IRootState) => state.token.data);
    const offices = useSelector((state: IRootState) => state.data.allOffices);
    const roles = useSelector((state: IRootState) => state.data.roles);
    const [emailErrorStatus, setEmailErrorStatus] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<ISignUpRequest>({
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
                .then(() => {
                    message.success('Сотрудник зарегистрирован');
                })
                .catch(errorHandler);
        }
    };

    return (
        <Collapse accordion>
            <Panel header="Создать пользователя" key="1">
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Имя'}
                        onChange={(value) => {
                            setNewUser({...newUser, name: value.target.value});
                        }}
                        value={newUser.name}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Фамилия'}
                        onChange={(value) => {
                            setNewUser({...newUser, surname: value.target.value});
                        }}
                        value={newUser.surname}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Должность'}
                        onChange={(value) => {
                            setNewUser({...newUser, position: value.target.value});
                        }}
                        value={newUser.position}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Почта'} 
                        type={'email'} 
                        error={emailErrorStatus}
                        onChange={(value) => {
                            setNewUser({...newUser, email: value.target.value});
                            setEmailErrorStatus(!validateEmail(newUser.email));
                        }}
                        value={newUser.email}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <ComboBox 
                        label={'Роль'} 
                        options={roles}
                        value={
                            roles
                                .map((item)=>({...item, label: item.label}))
                                .filter((item)=>newUser.roles === item.label).length === 1 ? 
                                roles
                                    .map((item)=>({...item, label: item.label}))
                                    .filter((item)=>newUser.roles === item.label)[0]
                                : null
                        }
                        onChange={(value) => {
                            if (value?.label){
                                setNewUser({...newUser, roles: value.label});
                            }
                        }}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <ComboBox 
                        label={'Офис'} 
                        options={offices.map((item)=>({id: item.id, label: item.name}))}
                        value={
                            offices
                                .map((item)=>({...item, label: item.name}))
                                .filter((item)=>newUser.office === item.id).length === 1 ? 
                                offices
                                    .map((item)=>({...item, label: item.name}))
                                    .filter((item)=>newUser.office === item.id)[0]
                                : null
                        }
                        onChange={(office)=>{
                            if (office?.id){
                                setNewUser({...newUser, office: +office.id});
                            }
                        }}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Пароль'} 
                        type={'password'}
                        onChange={(value) => {
                            setNewUser({...newUser, password: value.target.value});
                        }}
                        value={newUser.password}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Повторите пароль'} 
                        type={'password'}
                        onChange={(value) => {
                            setNewUser({...newUser, repeat_password: value.target.value});
                        }}
                        value={newUser.repeat_password}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseLastElemLayout>
                    <CustomBlockBtn onClick={signUpOnClick} disabled={
                        !(newUser && (typeof (newUser.office) === 'number')) ||
                        !(newUser && newUser.roles.length > 0) ||
                        !(newUser && newUser.email.length > 0) ||
                        !(newUser && newUser.surname.length > 0) ||
                        !(newUser && newUser.name.length > 0) ||
                        !(newUser && newUser.position.length > 0) ||
                        !(newUser.password.length > 0) ||
                        !(newUser.repeat_password.length > 0) ||
                        !(newUser.repeat_password === newUser.password)
                    }>
                        Зарегистрировать 
                    </CustomBlockBtn>
                </CollapseLastElemLayout>
            </Panel>
        </Collapse>
    );
};

export default CreateNewEmployee;