import React from 'react'
import { Button } from '@mui/material'

const OutlinedButton = ({buttonName, onClick, color, width}) => {
  return (
    <Button disableRipple={true} onClick={onClick} variant="outlined" sx={{borderColor:color, color, ...(width && {width}), '&:hover': {
      backgroundColor: 'inherit',
      boxShadow: 'none', 
      borderColor:"inherit"
    },}}>{buttonName}</Button>
  )
}

export default OutlinedButton