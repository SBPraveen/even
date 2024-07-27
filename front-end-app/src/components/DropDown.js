import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import { Typography } from '@mui/material'
import { useState } from 'react'

const DropDown = ({ menu, register, fieldName, placeholder }) => {
    const [selected, setSelected] = useState('')
    const registerForm = register ? { ...register(fieldName) } : {}
    const handleChange = (event) => {
        setSelected(event.target.value)
    }

    return (
        <FormControl fullWidth>
            <Select
                {...registerForm}
                value={selected}
                displayEmpty
                onChange={handleChange}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return (
                            <Typography
                                sx={{
                                    color: 'text.disabled',
                                }}
                            >
                                {placeholder}
                            </Typography>
                        )
                    }
                    return selected
                }}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '.MuiSelect-select': {
                        padding: 0,
                    },
                    width: '100%',
                }}
            >
                {menu &&
                    menu.map((menuItem, index) => (
                        <MenuItem key={index} value={menuItem}>
                            {menuItem}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

DropDown.propTypes = {
    fieldName: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
}

export default DropDown
