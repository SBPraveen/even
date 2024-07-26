import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import { useState } from 'react'

const DropDown = ({ menu }) => {
    const [selected, setSelected] = useState('')

    const handleChange = (event) => {
        setSelected(event.target.value)
    }

    return (
        <Select value={selected} onChange={handleChange} sx={{ width: '100%' }}>
            {menu &&
                menu.map((menuItem, index) => (
                    <MenuItem key={index} value={menuItem}>
                        {menuItem}
                    </MenuItem>
                ))}
        </Select>
    )
}

DropDown.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DropDown
