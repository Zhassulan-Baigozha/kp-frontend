import { GetAllUsr, UpdateUserData } from 'src/api/CustomAPI';
import React, { useState } from 'react';
import { IUser } from 'src/store/user/types';
import CustomTextField from '../base/CustomTextField';
import { IRootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from 'src/utils/validateEmail';
import { IUpdateUserFieldsRequest } from 'src/api/CustomAPIModel';
import { setAllUsersList } from 'src/store/allUsers/actions';
import { Collapse, message } from 'antd';
import CollapseElemLayout from 'src/layout/CollapseElemLayout';
import CollapseLastElemLayout from 'src/layout/CollapseLastElemLayout';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';
import ComboBox from '../base/ComboBox';

interface IUpdateEmployeeData {
    expanded: string | false;
    handlePanelChange: (value: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    setOpen: (value: boolean) => void;
    users: IUser[];
}

const UpdateEmployeeData: React.FC<IUpdateEmployeeData> = ({
    expanded,
    handlePanelChange,
    users,
}) => {
    const { Panel } = Collapse;
    const offices = useSelector((state: IRootState) => state.offices.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const [emailErrorStatus, setEmailErrorStatus] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [userFields, setUserFields] = useState<IUpdateUserFieldsRequest>({
        email: '',
        name: '',
        office: null,
        position: '',
        status: true,
        surname: '',
        uuid: ''
    });
    const updateCustomerData = async() => {
        await UpdateUserData(token.access, userFields)
            .then((res)=>{
                message.success('Данные клиента обновлены');
            }).catch((err) => {
                console.error(err);
            });
        const GetAllUsrResponse = await GetAllUsr(token.access);
        dispatch(setAllUsersList(GetAllUsrResponse));
    };

    return (
        <Collapse accordion>
            <Panel header="Изменить данные пользователя" key="1">
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Имя'}
                        onChange={(value) => {
                            setUserFields({...userFields, name: value.target.value});
                        }}
                        value={userFields.name}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Фамилия'}
                        onChange={(value) => {
                            setUserFields({...userFields, surname: value.target.value});
                        }}
                        value={userFields.surname}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Должность'}
                        onChange={(value) => {
                            setUserFields({...userFields, position: value.target.value});
                        }}
                        value={userFields.position}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <CustomTextField 
                        placeholder={'Почта'} 
                        type={'email'} 
                        error={emailErrorStatus}
                        onChange={(value) => {
                            setUserFields({...userFields, email: value.target.value});
                            setEmailErrorStatus(!validateEmail(userFields.email));
                        }}
                        value={userFields.email}
                        fullWidth={true}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <ComboBox 
                        label={'Выберите пользователя'} 
                        options={users.map((item, idx)=>({id: idx, label: item.surname + ' ' + item.name}))}
                        value={
                            userFields.uuid &&
              users
                  .filter((item) => (item.uuid === userFields.uuid)).length === 1
                                ? users
                                    .filter((item) => (item.uuid === userFields.uuid))
                                    .map((item, idx)=>({id: idx, label: item.surname + ' ' + item.name}))[0]
                                : null
                        }
                        onChange={(item) => {
                            if (
                                (typeof item?.id === 'number') && 
                users.length && 
                users[item.id]?.uuid && 
                (typeof users[item.id]?.uuid) === 'string'
                            ){
                                setUserFields({
                                    email: users[item.id].email,
                                    name: users[item.id].name,
                                    office: users[item.id].office,
                                    position: users[item.id].position,
                                    status: true,
                                    surname: users[item.id].surname,
                                    uuid: users[item.id].uuid
                                });
                            }
                        }}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <ComboBox 
                        label={'Офис'} 
                        options={offices.map((item)=>({...item, label: item.name}))}
                        value={
                            offices
                                .map((item)=>({...item, label: item.name}))
                                .filter((item)=>userFields.office === item.id).length === 1 ? 
                                offices
                                    .map((item)=>({...item, label: item.name}))
                                    .filter((item)=>userFields.office === item.id)[0]
                                : null
                        }
                        onChange={(office)=>{
                            if (office?.id){
                                setUserFields({...userFields, office: +office.id});
                            }
                        }}
                    />
                </CollapseElemLayout>
                <CollapseLastElemLayout>
                    <CustomBlockBtn onClick={updateCustomerData} >
            Зарегистрировать 
                    </CustomBlockBtn>
                </CollapseLastElemLayout>
            </Panel>
        </Collapse>
    );
};

export default UpdateEmployeeData;