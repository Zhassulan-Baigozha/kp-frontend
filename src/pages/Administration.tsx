import { GetAllUsr } from 'src/api/CustomAPI';
import React, { useEffect } from 'react';
import { IPages } from 'src/interfaces';
import { IUser } from 'src/store/user/types';
import SnackAlert from 'src/components/Administration/SnackAlert';
import CreateNewEmployee from 'src/components/Administration/CreateNewEmployee';
import UpdatePasswordBlock from 'src/components/Administration/UpdatePasswordBlock';
import UpdateEmployeeData from 'src/components/Administration/UpdateEmployeeData';
import UpdateEmployeeRole from 'src/components/Administration/UpdateEmployeeRole';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';

const Administration: React.FC<IPages> = ({
  setOpenCustomDialog,
}) => {
  const token = useSelector((state: IRootState) => state.token.data);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [snackText, setSnackText] = React.useState<string>('Данные обновлены');
  const [dialogText, setDialogText] = React.useState<string>('');
  const [expanded, setExpanded] = React.useState<string | false>('');
  const [open, setOpen] = React.useState(false);

  const handlePanelChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // useEffect(() => {
  //   GetAllUsr(token.access).then((res: IUser[]) => {
  //     setUsers(res);
  //   }).catch((err)=>{
  //     console.log(err.response);
  //     if (err.response.status === 400){
  //       setOpenCustomDialog(true);
  //     }
  //   });
  // });

  return (
    <div style={{
      width: '400px',
      margin: '0 auto',
      paddingTop: '32px',
      position: 'relative',
      top: '80px',
    }}>
      <SnackAlert textBody={snackText} handleClose={handleClose} open={open} />
      <CreateNewEmployee 
        expanded={expanded}
        handlePanelChange={handlePanelChange}
        setAlertText={setSnackText}
        setOpen={setOpen}
      />
      <UpdateEmployeeData 
        expanded={expanded}
        handlePanelChange={handlePanelChange}
        setAlertText={setSnackText}
        setOpen={setOpen}
        users={users}
      />
      <UpdateEmployeeRole 
        expanded={expanded}
        handlePanelChange={handlePanelChange}
        setAlertText={setSnackText}
        setOpen={setOpen}
        users={users}
      />
      <UpdatePasswordBlock 
        expanded={expanded}
        handlePanelChange={handlePanelChange}
        setAlertText={setSnackText}
        setOpen={setOpen}
        users={users}
      />
    </div>
  );
};

export default Administration;