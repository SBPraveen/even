import React from 'react'
import Slide from '@mui/material/Slide';
import { Snackbar, Alert } from '@mui/material'


const SnackBarAlert = ({text, isOpen, setIsOpen, severity}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };
    return (
        <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center" }} open={isOpen} autoHideDuration={1500} onClose={handleClose} TransitionComponent={Slide}>
            <Alert
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {text}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarAlert