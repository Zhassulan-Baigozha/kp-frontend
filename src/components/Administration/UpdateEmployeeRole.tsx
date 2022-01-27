import { UpdateUserRole } from 'src/api/CustomAPI';
import React, { useState } from 'react';
import { IUpdateUserRole } from '../../interfaces';
import { IUser } from '../../store/user/types';
import { IRootState } from '../../store';
import { useSelector } from 'react-redux';
import { Collapse, message } from 'antd';
import CollapseElemLayout from 'src/layout/CollapseElemLayout';
import CollapseLastElemLayout from 'src/layout/CollapseLastElemLayout';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';
import ComboBox from '../base/ComboBox';



const UpdateEmployeeRole: React.FC = () => {
    const { Panel } = Collapse;
    const [userFields, setUserFields] = useState<IUpdateUserRole>({
        role_name: '',
        user_id: ''
    });
    const roles = useSelector((state: IRootState) => state.roles.data);
    const users = useSelector((state: IRootState) => state.allUsers.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const updateRole = () => {
        UpdateUserRole(token.access, userFields)
            .then(() => {
                message.success('Роль клиента обновлено');
            }).catch((err) => {
                console.error(err);
            });
    };
    return (
        <Collapse accordion>
            <Panel header="Изменить роль пользователя" key="1">
                <CollapseElemLayout>
                    <ComboBox 
                        label={'Выберите пользователя'} 
                        options={users.map((item, idx)=>({id: idx, label: item.surname + ' ' + item.name}))}
                        value={
                            userFields.user_id &&
                            users
                                .filter((item) => (item.uuid === userFields.user_id)).length === 1
                                ? users
                                    .filter((item) => (item.uuid === userFields.user_id))
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
                                    user_id: users[item.id].uuid,
                                    role_name: users[item.id].roles
                                });
                            }
                        }}
                    />
                </CollapseElemLayout>
                <CollapseElemLayout>
                    <ComboBox 
                        label={'Выберите роль'} 
                        options={roles}
                        value={
                            userFields.role_name &&
              roles
                  .filter((item) => (item.label === userFields.role_name)).length === 1
                                ? roles
                                    .filter((item) => (item.label === userFields.role_name))
                                    .map((item, idx)=>({id: idx, label: item.label}))[0]
                                : null
                        }
                        onChange={(item) => {
                            // if (item?.name) {
                            //   setUserFields({
                            //     ...userFields,
                            //     role_name: item.name
                            //   });
                            // }
                        }}
                    />
                </CollapseElemLayout>
                <CollapseLastElemLayout>
                    <CustomBlockBtn onClick={updateRole} disabled={
                        !(userFields && userFields.role_name.length > 0) ||
            !(userFields && userFields.user_id.length > 0)
                    }>
            Изменить 
                    </CustomBlockBtn>
                </CollapseLastElemLayout>
            </Panel>
        </Collapse>
    );
};

export default UpdateEmployeeRole;