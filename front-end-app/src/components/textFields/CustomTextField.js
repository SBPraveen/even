import { InputBase, Box, Tooltip } from '@mui/material';
import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const CustomTextField = ({ size, placeholder, isEndAdornment, tooltip, register, fieldName }) => {
  const registerForm = register ? {...register(fieldName)} : {}
  return (
      <InputBase
      {...registerForm}
        size={size}
        placeholder={placeholder}
        endAdornment={ isEndAdornment &&
          <InputAdornment position="end"><Tooltip title={tooltip}>
            <InfoOutlinedIcon sx={{color:'text.disabled', fontSize:"1rem", cursor:"pointer"}}/>
          </Tooltip></InputAdornment>
        }
        sx={{
          '& .MuiInputBase-input': {
            padding: '0px', // Change the padding value as needed
          },
        }}
      />

  )
}

export default CustomTextField

