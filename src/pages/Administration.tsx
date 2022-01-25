import { GetAllUsr } from 'src/api/CustomAPI';
import React, { useEffect, useState } from 'react';
import { IPages } from 'src/interfaces';
import { IUser } from 'src/store/user/types';
import CreateNewEmployee from 'src/components/Administration/CreateNewEmployee';
import UpdatePasswordBlock from 'src/components/Administration/UpdatePasswordBlock';
import UpdateEmployeeData from 'src/components/Administration/UpdateEmployeeData';
import UpdateEmployeeRole from 'src/components/Administration/UpdateEmployeeRole';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { Collapse } from 'antd';

const Administration: React.FC<IPages> = ({
    setOpenCustomDialog,
}) => {
    const token = useSelector((state: IRootState) => state.token.data);
    const [users, setUsers] = useState<IUser[]>([]);
    const [snackText, setSnackText] = useState<string>('Данные обновлены');
    const [dialogText, setDialogText] = useState<string>('');
    const [expanded, setExpanded] = useState<string | false>('');
    const [open, setOpen] = useState(false);

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
            <CreateNewEmployee 
                expanded={expanded}
                handlePanelChange={handlePanelChange}
                setOpen={setOpen}
            />
            <UpdateEmployeeData 
                expanded={expanded}
                handlePanelChange={handlePanelChange}
                setOpen={setOpen}
                users={users}
            />
            <UpdateEmployeeRole 
                expanded={expanded}
                handlePanelChange={handlePanelChange}
                setOpen={setOpen}
                users={users}
            />
            <UpdatePasswordBlock 
                expanded={expanded}
                handlePanelChange={handlePanelChange}
                setOpen={setOpen}
                users={users}
            />
        </div>
    );
};

export default Administration;