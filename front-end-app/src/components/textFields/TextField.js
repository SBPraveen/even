import { InputBase, Paper, Tooltip } from '@mui/material';
import React from 'react'

const TextField = ({label, placeholder}) => {
  
  return (
<Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': {label} }}
      />
      <Tooltip title="If the key is entered then the messages are encrypted & decrypted using the Advanced Encryption Standard (AES) algorithm"> 

      </Tooltip>

    </Paper>
  )
}

export default TextField