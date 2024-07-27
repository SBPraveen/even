/* eslint-disable react/no-unknown-property */
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

const FolderSelect = () => {
    const [path, setPath] = useState('')

    const handleChange = async () => {
        const path = await window.ipcRenderer.fileSystemAccess()
        setPath(path)
    }
    return (
        <Box
            sx={{
                alignItems: 'center',
                background: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                height: '5vh',
                justifyContent: 'flex-start',
                maxHeight: '50px',
                minHeight: '30px',
                paddingLeft: '1rem',
                width: '100%',
            }}
            onClick={handleChange}
        >
            {path ? (
                <Typography>{path}</Typography>
            ) : (
                <Typography sx={{ color: 'text.disabled' }}>
                    Folder path
                </Typography>
            )}
        </Box>
    )
}

export default FolderSelect
