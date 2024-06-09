import { Box, Typography, Tooltip } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import OnlyIconButton from './buttons/OnlyIconButton';
import { useTheme } from '@mui/material/styles';

const BoxCardChild = ({ boxOutline, bgColor, data, onClose, onCardClick, dataKey }) => {
    const theme = useTheme();
    return (
            <Box sx={{ boxShadow: Boolean(boxOutline)? 0 : 1, border: Boolean(boxOutline)? `1px solid ${theme.palette.primary.iconLight}` : "none", borderRadius: "3px", bgcolor: "primary.tabs", display: "flex", position: "relative", alignItems: "center", cursor: "pointer", marginRight: "1.5rem", paddingLeft:"0.5rem", paddingRight:Boolean(onClose)?"0":"0.5rem"}} >
                <Tooltip title={data[dataKey]} placement="bottom">
                <Box sx={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", display: "block", color: "text.disabled", maxWidth:"130px"}} onClick={onCardClick ? () => onCardClick(data) : () => {}}>
                    <Typography sx={{cursor:"pointer", color:"text.backgroundMatch" }} variant="body2">{data[dataKey]}</Typography>
                </Box>
                </Tooltip>
                {
                    Boolean(onClose) && <OnlyIconButton sx={{ position: "absolute", right: "5px" }} Icon={CloseIcon} color={'fail.light'} data={data} onHoverColor={'fail.main'} width='60%' onClick={onClose} />
                }
            </Box>


    )
}

export default BoxCardChild

