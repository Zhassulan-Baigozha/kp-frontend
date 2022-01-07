import React from 'react';
import { useSelector } from 'react-redux';
// import { ContainedButton } from 'src/components/CustomButtons';
import CustomTextField from 'src/components/CustomTextField';
import { IPages, ISignUpUser } from 'src/interfaces';
import { IRootState } from 'src/store';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IUpdatePassword } from 'src/api/CustomAPIModel';
// import Snackbar from '@mui/material/Snackbar';
// import CustomAlert from 'src/components/CustomAlert';
import { validateEmail } from 'src/utils/validateEmail';
import { UpdatePassword, UpdateUserData } from 'src/api/CustomAPI';

const ProfilePage: React.FC<IPages> = ({
  switchPage,
}) => {
  const token = useSelector((state: IRootState) => state.token.data);
  const userData = useSelector((state: IRootState) => state.user.data);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [emailErrorStatus, setEmailErrorStatus] = React.useState<boolean>(false);
  const [passwords, setPasswords] = React.useState<IUpdatePassword>({
    new_password: '',
    repeat_password: '',
    uuid: userData.uuid
  });
  const [user, setUser] = React.useState<ISignUpUser>(userData);
  const [open, setOpen] = React.useState(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const updatePasswordClick = async () => {
    await UpdatePassword(token.access, passwords);
    setOpen(true);
  };

  const updateUserClick = async () => {
    await UpdateUserData(token.access, user);
    setOpen(true);
  };
  

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{
      width: '400px',
      margin: '0 auto',
      paddingTop: '32px',
      position: 'relative',
      top: '80px',
    }}>
      ProfilePage
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <CustomAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Данные обновлены
        </CustomAlert>
      </Snackbar> */}
      {/* <Accordion 
        expanded={expanded === 'panel1'} 
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>
            Изменить свои данные
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ paddingBottom: '16px', padding: '8px 16px', paddingTop: '0px' }}>
            <CustomTextField 
              label={'Имя'}
              onTextChange={(name) => {
                setUser({...user, name});
              }}
              value={user.name}
            />
          </div>
          <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
            <CustomTextField 
              label={'Фамилия'}
              onTextChange={(surname) => {
                setUser({...user, surname});
              }}
              value={user.surname}
            />
          </div>
          <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
            <CustomTextField 
              placeholder={'Почта'} 
              type={'email'} 
              // error={emailErrorStatus}
              onChange={(value) => {
                setUser({...user, email: value.target.value});
                setEmailErrorStatus(!validateEmail(user.email));
              }}
              value={user.email}
            />
          </div>
          <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
            <ContainedButton 
              text="Подтвердить" 
              onClick={updateUserClick}
              disabled={
                !(user.name.length > 0) ||
                !(user.email.length > 0) ||
                !(user.surname.length > 0) ||
                emailErrorStatus
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion 
        expanded={expanded === 'panel2'} 
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>Изменить пароль</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ paddingBottom: '16px', padding: '8px 16px', paddingTop: '0px' }}>
            <CustomTextField 
              label={'Пароль'} 
              type={'password'}
              onTextChange={(new_password) => {
                setPasswords({...passwords, new_password});
              }}
              value={passwords.new_password}
            />
          </div>
          <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
            <CustomTextField 
              label={'Повторите пароль'} 
              type={'password'}
              onTextChange={(repeat_password) => {
                setPasswords({...passwords, repeat_password});
              }}
              value={passwords.repeat_password}
            />
          </div>
          <div style={{ paddingBottom: '16px', padding: '8px 16px' }}>
            <ContainedButton 
              text="Подтвердить"
              disabled={
                !(passwords.new_password.length > 0) ||
                !(passwords.repeat_password.length > 0) ||
                !(passwords.repeat_password === passwords.new_password)
              } 
              onClick={updatePasswordClick}
            />
          </div>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default ProfilePage;