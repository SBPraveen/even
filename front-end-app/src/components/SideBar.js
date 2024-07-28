/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */
import { Box, Typography } from '@mui/material'
import CustomList from './CustomList'
import PropTypes from 'prop-types'
import { useState } from 'react'

const SideBar = ({ data, handleSideBarOpen, setValueWssConnect }) => {
    const onUrlSelection = (data) => {
        setValueWssConnect('url', data.url)
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
