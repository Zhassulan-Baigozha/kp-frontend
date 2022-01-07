import { UpdateUserRole } from 'src/api/CustomAPI';
import React from 'react';
// import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
// import { ContainedButton } from '../CustomButtons';
// import ComboBox from '../ComboBox';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IUpdateUserRole } from '../../interfaces';
import { IUser } from '../../store/user/types';
import { IRootState } from '../../store';
import { useSelector } from 'react-redux';

interface IUpdateEmployeeData {
  expanded: string | false;
  handlePanelChange: (value: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  setAlertText: (value: string) => void;
  setOpen: (value: boolean) => void;
  users: IUser[];
}

const UpdateEmployeeRole: React.FC<IUpdateEmployeeData> = ({
  expanded,
  handlePanelChange,
  setAlertText,
  setOpen,
  users,
}) => {
  const [userFields, setUserFields] = React.useState<IUpdateUserRole>({
    role_name: '',
    user_id: ''
  });
  const roles = useSelector((state: IRootState) => state.roles.data);
  const token = useSelector((state: IRootState) => state.token.data);
  const updateRole = () => {
    UpdateUserRole(token.access, userFields)
      .then((res)=>{
        setAlertText('Роль клиента обновлено');
        setOpen(true);
      }).catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      UpdateEmployeeRole
    </div>
    // <Accordion 
    //   expanded={expanded === 'panel3'} 
    //   onChange={handlePanelChange('panel3')}
    // >
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1bh-content"
    //     id="panel1bh-header"
    //   >
    //     <Typography sx={{ flexShrink: 0 }}>
    //       Изменить роль пользователя
    //     </Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px', paddingTop: '0px' }}>
    //       <ComboBox 
    //         label={'Выберите пользователя'} 
    //         options={users.map((item, idx)=>({id: idx, label: item.surname + ' ' + item.name}))}
    //         value={
    //           userFields.user_id &&
    //           users
    //             .filter((item) => (item.uuid === userFields.user_id)).length === 1
    //             ? users
    //               .filter((item) => (item.uuid === userFields.user_id))
    //               .map((item, idx)=>({id: idx, label: item.surname + ' ' + item.name}))[0]
    //             : null
    //         }
    //         setValue={(item) => {
    //           if (
    //             (typeof item?.id === 'number') && 
    //             users.length && 
    //             users[item.id]?.uuid && 
    //             (typeof users[item.id]?.uuid) === 'string'
    //           ){
    //             setUserFields({
    //               user_id: users[item.id].uuid,
    //               role_name: users[item.id].roles
    //             });
    //           }
    //         }}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ComboBox 
    //         label={'Выберите роль'} 
    //         options={roles}
    //         value={
    //           userFields.role_name &&
    //           roles
    //             .filter((item) => (item.label === userFields.role_name)).length === 1
    //             ? roles
    //               .filter((item) => (item.label === userFields.role_name))
    //               .map((item, idx)=>({id: idx, label: item.label}))[0]
    //             : null
    //         }
    //         setValue={(item) => {
    //           if (item?.name) {
    //             setUserFields({
    //               ...userFields,
    //               role_name: item.name
    //             });
    //           }
    //         }}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ContainedButton 
    //         text="Изменить" 
    //         onClick={updateRole}
    //         disabled={
    //           !(userFields && userFields.role_name.length > 0) ||
    //           !(userFields && userFields.user_id.length > 0)
    //         } 
    //       />
    //     </div>
    //   </AccordionDetails>
    // </Accordion>
  );
};

export default UpdateEmployeeRole;