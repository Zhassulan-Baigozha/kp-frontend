import React from 'react';
// import Snackbar from '@mui/material/Snackbar';
// import CustomAlert from '../CustomAlert';

interface ISnackAlert {
  handleClose: () => void;
  open: boolean;
  textBody: string;
}

const SnackAlert: React.FC<ISnackAlert> = ({
  handleClose,
  open,
  textBody,
}) => {
  return (
    <div>
      SnackAlert
    </div>
    // <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //   <CustomAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    //     {textBody}
    //   </CustomAlert>
    // </Snackbar>
  );
};

export default SnackAlert;
