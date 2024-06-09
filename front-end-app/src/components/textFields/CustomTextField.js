import { InputBase,  Tooltip } from '@mui/material';
import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const CustomTextField = ({ size, placeholder, isEndAdornment, tooltip, register, fieldName, multiline=false, rows=0, sx={}}) => {
  const registerForm = register ? {...register(fieldName)} : {}
  return (
      <InputBase
      multiline={multiline}
      rows={rows}
      {...registerForm}
        size={size}
        placeholder={placeholder}
        endAdornment={ isEndAdornment &&
          <InputAdornment position="end"><Tooltip title={tooltip}>
            <InfoOutlinedIcon sx={{color:'text.disabled', fontSize:"1rem", cursor:"pointer"}}/>
          </Tooltip></InputAdornment>
        }
        sx={{
          ...sx,
          '& .MuiInputBase-input': {
            padding: '0px',
          },
          '& textarea': {
            scrollbarWidth: 'none', /* Firefox */
            '&::-webkit-scrollbar': {
              display: 'none', /* Safari and Chrome */
            },
          },
        }}
      />

  )
}

export default CustomTextField

