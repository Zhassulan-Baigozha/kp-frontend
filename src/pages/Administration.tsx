import React, { useState } from 'react';
import CreateNewEmployee from 'src/components/Administration/CreateNewEmployee';
import UpdatePasswordBlock from 'src/components/Administration/UpdatePasswordBlock';
import UpdateEmployeeData from 'src/components/Administration/UpdateEmployeeData';
import UpdateEmployeeRole from 'src/components/Administration/UpdateEmployeeRole';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';

const Administration: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();

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

    return (
        <div style={{
            width: '400px',
            margin: '0 auto',
            paddingTop: '32px',
            position: 'relative',
            top: '80px',
        }}>
            <CreateNewEmployee />
            <UpdateEmployeeData />
            <UpdateEmployeeRole />
            <UpdatePasswordBlock />
        </div>
    );
};

export default Administration;