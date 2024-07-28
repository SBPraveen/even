/* eslint-disable no-unused-vars */
/* eslint-disable sort-keys */
import { Box } from '@mui/material'
import CustomList from './CustomList'
import CustomTextField from './textFields/CustomTextField'
import PropTypes from 'prop-types'
import { useState } from 'react'

const SideBar = ({ data }) => {
    const [searchText, setSearchText] = useState('')

    const accessSearchText = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            {/* <CustomTextField placeholder={'Search'} />
            <CustomList data={CustomList} /> */}
        </Box>
    )
}

SideBar.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.number.isRequired,
        }).isRequired,
    ),
}
export default SideBar
