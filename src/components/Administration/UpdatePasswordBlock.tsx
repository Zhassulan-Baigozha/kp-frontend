import React from 'react';
import CustomTextField from '../base/CustomTextField';
import { IComboBoxOption } from '../../interfaces';
import { IUpdatePassword } from '../../api/CustomAPIModel';
import { IUser } from '../../store/user/types';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { UpdatePassword } from 'src/api/CustomAPI';
import { Collapse, message } from 'antd';
import CollapseLastElemLayout from 'src/layout/CollapseLastElemLayout';
import CollapseElemLayout from 'src/layout/CollapseElemLayout';
import { CustomBlockBtn } from 'src/components/base/CustomBtn';
import ComboBox from '../base/ComboBox';

interface IUpdatePasswordBlock {
  expanded: string | false;
  handlePanelChange: (value: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  setAlertText: (value: string) => void;
  setOpen: (value: boolean) => void;
  users: IUser[];
}

const UpdatePasswordBlock: React.FC<IUpdatePasswordBlock> = ({
  expanded,
  handlePanelChange,
  setAlertText,
  setOpen,
  users,
}) => {
  const { Panel } = Collapse;
  const token = useSelector((state: IRootState) => state.token.data);
  const [selectedUser, setSelectedUser] = React.useState<IComboBoxOption | null>(null);
  const [passwords, setPasswords] = React.useState<IUpdatePassword>({
    new_password: '',
    repeat_password: '',
    uuid: ''
  });
  const updatePasswordClick = async () => {
    if (
      selectedUser?.id && 
      passwords.new_password &&
      passwords.repeat_password && 
      passwords.new_password === passwords.repeat_password
    ){
      UpdatePassword(token.access, {...passwords, uuid: users[+selectedUser.id].uuid});
      message.success('Пароль обновлен');
    } else {
      if (!selectedUser?.id) {
        message.warning('Вы не выбрали пользователя');
      } else if (!passwords.new_password) {
        message.warning('Вы не ввели пароль');
      } else if (!passwords.repeat_password) {
        message.warning('Вы не ввели пароль повторно');
      } else if (passwords.new_password !== passwords.repeat_password) {
        message.warning('пароли не совпадают');
      }
    }
  };

  return (
    <Collapse accordion>
      <Panel header="Изменить данные пользователя" key="1">
        <CollapseElemLayout>
          <ComboBox 
            label={'Выберите пользователя'} 
            options={users.map((item, idx)=>({id: idx, label: item.surname + ' '+ item.name}))}
            value={selectedUser}
            onChange={setSelectedUser}
          />
        </CollapseElemLayout>
        <CollapseElemLayout>
          <CustomTextField 
            placeholder={'Пароль'} 
            type={'password'}
            onChange={(value) => {
              setPasswords({...passwords, new_password: value.target.value});
            }}
            value={passwords.new_password}
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
          />
        </CollapseElemLayout>
        <CollapseLastElemLayout>
          <CustomBlockBtn onClick={updatePasswordClick} disabled={
            !(selectedUser && selectedUser.label.length > 0) ||
            !(passwords.new_password.length > 0) ||
            !(passwords.repeat_password.length > 0) ||
            !(passwords.repeat_password === passwords.new_password)
          }>
            Подтвердить 
          </CustomBlockBtn>
        </CollapseLastElemLayout>
      </Panel>
    </Collapse>
  );
};

export default UpdatePasswordBlock;