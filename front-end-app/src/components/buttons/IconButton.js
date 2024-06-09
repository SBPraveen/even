import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const IconButton = ({Icon, buttonName, buttonBackground, iconColor, width, handleSubmit, onSubmit, isLoading, sx}) => {
  return (
    <Button  onClick={handleSubmit && onSubmit ? handleSubmit(onSubmit) : handleSubmit} variant="contained" startIcon={!isLoading && <Icon/>} sx={{
      ...(sx&&{...sx}),
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
        {isLoading ? <CircularProgress size={20} sx={{ color: iconColor }}/> : buttonName}
    </Button>
  )
}

export default IconButton