import React from 'react'
import { Typography } from '@mui/material'

const TextButton = ({color, text, onHoverColor, onClick}) => {
  return (
    <Typography onClick={onClick} variant="body2" sx={{
        color,
        padding:0,
        cursor:"pointer",
        '&:hover': {
            backgroundColor: 'inherit', 
            boxShadow: 'none', 
            color: onHoverColor,
          },
    }}>{text}
    </Typography>

  )
}

export default TextButton