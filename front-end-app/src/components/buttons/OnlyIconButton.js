import React from 'react'
import IconButton from '@mui/material/IconButton';


const OnlyIconButton = ({Icon, color, onHoverColor, width, onClick, data }) => {
  return (
    <IconButton onClick={() => onClick(data)} aria-label="close" disableRipple sx={{
      padding:0,
      '&:hover': {
        backgroundColor: 'transparent',
        '& .MuiSvgIcon-root': {
          color: onHoverColor,
        },
      },
      '& .MuiSvgIcon-root': {
        color,
      },
    }}>
      <Icon sx={{width}} />
    </IconButton>
  )
}

export default OnlyIconButton