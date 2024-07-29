/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */
import { Box, Typography } from '@mui/material'
import CustomList from './CustomList'
import PropTypes from 'prop-types'
import { useState } from 'react'

const SideBar = ({
    data,
    handleSideBarOpen,
    setValueWssConnect,
    setSideBarData,
}) => {
    const [path, setPath] = useState('')

    const onUrlSelection = (data) => {
        setValueWssConnect('url', data.url)
    }
    const onFolderSelect = async () => {
        const path = await window.ipcRenderer.fileSystemAccess(true)
        setPath(path)
        const newData = await window.ipcRenderer.importNewSchema(path)
        setSideBarData(newData)
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    height: '8vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid white',
                }}
            >
                <Typography variant='h5' sx={{ color: 'text.backgroundMatch' }}>
                    Collections
                </Typography>
            </Box>
            <CustomList
                data={data}
                onUrlSelection={onUrlSelection}
                handleSideBarOpen={handleSideBarOpen}
            />
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
                onClick={onFolderSelect}
            >
                <Typography sx={{ color: 'text.backgroundMatch' }}>
                    Import new collections
                </Typography>
            </Box>
        </Box>
    )
}

SideBar.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
    ),
    handleSideBarOpen: PropTypes.func.isRequired,
    setValueWssConnect: PropTypes.func.isRequired,
}
export default SideBar
