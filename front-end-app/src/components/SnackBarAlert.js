import { Alert, Snackbar } from '@mui/material'
import PropTypes from 'prop-types'
import Slide from '@mui/material/Slide'

const SnackBarAlert = ({
    closeSnackBar,
    isOpen,
    persist = false,
    severity,
    text,
}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        closeSnackBar()
    }
    return (
        <Snackbar
            anchorOrigin={{
                horizontal: 'center',
                vertical: persist ? 'top' : 'bottom',
            }}
            open={isOpen}
            autoHideDuration={persist ? null : 1500}
            onClose={handleClose}
            TransitionComponent={Slide}
        >
            <Alert severity={severity} variant='filled' sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    )
}

SnackBarAlert.propTypes = {
    closeSnackBar: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    persist: PropTypes.bool,
    severity: PropTypes.oneOf(['success', 'info', 'warning', 'error'])
        .isRequired,
    text: PropTypes.string.isRequired,
}

export default SnackBarAlert
