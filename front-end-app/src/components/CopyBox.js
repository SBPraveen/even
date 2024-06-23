import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import SnackBarAlert from './SnackBarAlert'


const CopyBox = ({ text }) => {
    const [onCopyClick, setOnCopyClick] = useState(false)
    const handleOnCopy = () => {
        setOnCopyClick(true)
        window.ipcRenderer.send('copyToClipBoard', text)
    }

    return (
        <Box onClick={handleOnCopy} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", position: "relative", padding: "0 1rem", boxShadow: 2, bgcolor: "primary.white", borderRadius: "8px", height: "4vh", minWidth: "100px", maxHeight: "40px", minHeight: "20px", }}>
            <Typography sx={{ color: "text.backgroundMatch", cursor: "copy" }}>{text}</Typography>
            <SnackBarAlert text={"Copied to clipboard"} isOpen={onCopyClick} setIsOpen={setOnCopyClick} severity={"success"} />
        </Box>
    )
}

export default CopyBox