import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import SnackBarAlert from './SnackBarAlert'
import styles from '../styles/components/CopyBox'
import { useState } from 'react'

const CopyBox = ({ text }) => {
    const [onCopyClick, setOnCopyClick] = useState(false)
    const handleOnCopy = () => {
        setOnCopyClick(true)
        window.ipcRenderer.copyToClipBoard(text)
    }
    const closeSnackBar = () => {
        setOnCopyClick(false)
    }
    return (
        <Box onClick={handleOnCopy} sx={styles.main}>
            <Typography sx={{ color: 'text.backgroundMatch', cursor: 'copy' }}>
                {text}
            </Typography>
            <SnackBarAlert
                text={'Copied to clipboard'}
                isOpen={onCopyClick}
                closeSnackBar={closeSnackBar}
                severity={'success'}
            />
        </Box>
    )
}

CopyBox.propTypes = {
    text: PropTypes.string.isRequired,
}

export default CopyBox
