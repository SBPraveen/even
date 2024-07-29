/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */
import { Box, Typography } from '@mui/material'
import CustomList from './CustomList'
import PropTypes from 'prop-types'

const SideBar = ({
    data,
    handleSideBarOpen,
    setValueWssConnect,
    setSideBarData,
}) => {
    const onUrlSelection = (data) => {
        setValueWssConnect('url', data.url)
    }
    const onFolderSelect = async () => {
        const path = await window.ipcRenderer.fileSystemAccess()
        const newData = await window.ipcRenderer.importNewSchema()
        setSideBarData(newData)
    }

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
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
                    background: 'white',
                    position: 'absolute',
                    bottom: '1.5vh',
                    right: '1.5vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '8px',
                }}
                onClick={onFolderSelect}
            >
                <Typography sx={{ color: 'primary.main', cursor: 'pointer' }}>
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
