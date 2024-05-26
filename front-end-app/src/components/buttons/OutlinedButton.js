import React from 'react'
import { Button } from '@mui/material'

const OutlinedButton = ({buttonName, onClick, color, width}) => {
  return (
    <Button variant="outlined" sx={{borderColor:color, color, ...(width && {width})}}>{buttonName}</Button>
  )
}

export default OutlinedButton