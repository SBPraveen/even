import { Box, Typography, Tooltip } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import OnlyIconButton from './buttons/OnlyIconButton';


const BoxCardChild = ({ data, onClose, onCardClick }) => {
    return (
        
            <Box sx={{ boxShadow: 1, borderRadius: "3px", bgcolor: "primary.tabs", display: "flex", position: "relative", alignItems: "center", cursor: "pointer", marginRight: "1.5rem", paddingLeft:"0.3rem"}} >
                <Tooltip title={data.cookieName} placement="bottom">
                <Box sx={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", display: "block", color: "text.disabled", maxWidth:"130px" }} onClick={() => onCardClick(data)}>
                    <Typography variant="body2">{data.cookieName}</Typography>
                </Box>
                </Tooltip>
                <OnlyIconButton sx={{ position: "absolute", right: "5px" }} Icon={CloseIcon} color={'fail.light'} data={data} onHoverColor={'fail.main'} width='60%' onClick={onClose} />
            </Box>


    )
}

export default BoxCardChild

