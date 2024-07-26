/* eslint-disable react/no-unknown-property */
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

const FolderSelect = () => {
    const [path, setPath] = useState('')

    const handleChange = async () => {
        console.log(
            '(((((((((((((((((((((((((((())))))))))))))))))))))))))))))',
        )
        const path = await window.ipcRenderer.fileSystemAccess()
        setPath(path)
    }
    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
            }}
            onClick={handleChange}
        >
            {path ? (
                <Typography>{path}</Typography>
            ) : (
                <Typography>Folder path</Typography>
            )}
        </Box>
    )
}

export default FolderSelect
