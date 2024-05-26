import React from 'react'
import {  Button } from '@mui/material'

const TextButton = ({color, text, onHoverColor, onClick}) => {
  return (
    <Button onClick={onClick} variant="body2" sx={{
        color,
        padding:0,
        cursor:"pointer",
        '&:hover': {
            backgroundColor: 'inherit', 
            boxShadow: 'none', 
            color: onHoverColor,
          },
    }}>{text}
    </Button>

  )
}

export default TextButton