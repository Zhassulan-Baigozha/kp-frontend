import { GetAllUsr, UpdateUserData } from 'src/api/CustomAPI';
import React from 'react';
// import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
// import { ContainedButton } from '../CustomButtons';
// import ComboBox from '../ComboBox';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IUser } from 'src/store/user/types';
import CustomTextField from '../CustomTextField';
import { IRootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from 'src/utils/validateEmail';
import { IUpdateUserFieldsRequest } from 'src/api/CustomAPIModel';
import { setAllUsersList } from 'src/store/allUsers/actions';

interface IUpdateEmployeeData {
  expanded: string | false;
  handlePanelChange: (value: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  setAlertText: (value: string) => void;
  setOpen: (value: boolean) => void;
  users: IUser[];
}

const UpdateEmployeeData: React.FC<IUpdateEmployeeData> = ({
  expanded,
  handlePanelChange,
  setAlertText,
  setOpen,
  users,
}) => {
  const offices = useSelector((state: IRootState) => state.offices.data);
  const token = useSelector((state: IRootState) => state.token.data);
  const [emailErrorStatus, setEmailErrorStatus] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const [userFields, setUserFields] = React.useState<IUpdateUserFieldsRequest>({
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
        setAlertText('Данные клиента обновлены');
        setOpen(true);
      }).catch((err) => {
        console.error(err);
      });
    const GetAllUsrResponse = await GetAllUsr(token.access);
    dispatch(setAllUsersList(GetAllUsrResponse));
  };

  return (
    <div>
      UpdateEmployeeData
    </div>
    // <Accordion 
    //   expanded={expanded === 'panel2'} 
    //   onChange={handlePanelChange('panel2')}
    // >
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1bh-content"
    //     id="panel1bh-header"
    //   >
    //     <Typography sx={{ flexShrink: 0 }}>
    //       Изменить данные пользователя
    //     </Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px', paddingTop: '0px' }}>
    //       <ComboBox 
    //         label={'Выберите пользователя'} 
    //         options={users.map((item, idx)=>({id: idx, label: item.surname + ' ' + item.name}))}
    //         value={
    //           userFields.uuid &&
    //           users
    //             .filter((item) => (item.uuid === userFields.uuid)).length === 1
    //             ? users
    //               .filter((item) => (item.uuid === userFields.uuid))
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
    //               email: users[item.id].email,
    //               name: users[item.id].name,
    //               office: users[item.id].office,
    //               position: users[item.id].position,
    //               status: true,
    //               surname: users[item.id].surname,
    //               uuid: users[item.id].uuid
    //             });
    //           }
    //         }}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Имя'}
    //         onTextChange={(name) => {
    //           setUserFields({...userFields, name});
    //         }}
    //         value={userFields.name}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Фамилия'}
    //         onTextChange={(surname) => {
    //           setUserFields({...userFields, surname});
    //         }}
    //         value={userFields.surname}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Должность'}
    //         onTextChange={(position) => {
    //           setUserFields({...userFields, position});
    //         }}
    //         value={userFields.position}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <CustomTextField 
    //         label={'Почта'} 
    //         type={'email'} 
    //         error={emailErrorStatus}
    //         onTextChange={(email) => {
    //           setUserFields({...userFields, email});
    //           setEmailErrorStatus(!validateEmail(userFields.email));
    //         }}
    //         value={userFields.email}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ComboBox 
    //         label={'Офис'} 
    //         options={offices.map((item)=>({...item, label: item.name}))}
    //         value={
    //           offices
    //             .map((item)=>({...item, label: item.name}))
    //             .filter((item)=>userFields.office === item.id).length === 1 ? 
    //             offices
    //               .map((item)=>({...item, label: item.name}))
    //               .filter((item)=>userFields.office === item.id)[0]
    //             : null
    //         }
    //         onChange={(office)=>{
    //           if (office?.id){
    //             setUserFields({...userFields, office: office.id});
    //           }
    //         }}
    //       />
    //     </div>
    //     <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
    //       <ContainedButton  text="Обновить" onClick={updateCustomerData}/>
    //     </div>
    //   </AccordionDetails>
    // </Accordion>
  );
};

export default UpdateEmployeeData;