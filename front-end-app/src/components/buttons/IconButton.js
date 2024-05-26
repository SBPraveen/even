import React from 'react'
import Button from '@mui/material/Button';

const IconButton = ({Icon, buttonName, buttonBackground, iconColor, width}) => {
  return (
    <Button variant="contained" startIcon={<Icon/>} sx={{
      ...(width && {width}),
        bgcolor:buttonBackground,
        '&:hover': {
            bgcolor:buttonBackground,
            boxShadow: 'none',  
          },
          '& .MuiButton-startIcon': {
            color: iconColor,
          },
        }}>
        {buttonName}
    </Button>
  )
}

export default IconButton