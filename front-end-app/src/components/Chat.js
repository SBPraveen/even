import { Box, Stack, Typography, Tooltip } from '@mui/material'
import React from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import OnlyIconButton from './buttons/OnlyIconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const Chat = ({ data, isHalfWidth, onLatencyInspect, isLatencyInspect }) => {
    const onCopyToClipboard = () => {

    }
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", background: "orange", width: "100%", height: "5%" }}>
                <Stack direction="row" spacing={5} sx={{ marginRight: "1vw", background: "violet" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "text.disabled", cursor: "pointer" }}>
                        <SettingsOutlinedIcon sx={{ height: "80%" }} />
                        <Typography sx={{ marginLeft: "0.3vw", color: "text.disabled", cursor: "pointer" }}>Settings</Typography>
                    </Box>
                    {
                        isLatencyInspect ? <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer" }} onClick={onLatencyInspect}>
                            <TimerOutlinedIcon sx={{ height: "80%" }} />
                            <Typography sx={{ marginLeft: "0.3vw", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer" }}>Inspect latency</Typography>
                        </Box> : <Tooltip title={"Select any two messages to view the latency between them"}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer" }} onClick={onLatencyInspect}>
                                <TimerOutlinedIcon sx={{ height: "80%" }} />
                                <Typography sx={{ marginLeft: "0.3vw", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer" }}>Inspect latency</Typography>
                            </Box>
                        </Tooltip>
                    }

                </Stack>
            </Box>
            <Box sx={{ height: "80%", background: "green", width: "100%", overflowY: "auto", overflowX: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                <Stack direction="column" spacing={3} sx={{ width: "55vw", paddingTop:"1vh", background: "purple" }}>
                    {
                        data.map((chat) => (
                            <Box key={chat.id} sx={{ width: "100%", background: "blue", display:"flex", alignItems:"center", justifyContent: chat.isSent ? "flex-end" : "flex-start" }}>
                                <Box sx={{ width: "70%", background: "red", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                                    <Typography sx={{ width: "78%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", display: "block", color: "text.main", background: "white" }}>{chat.message}</Typography>

                                    <Box sx={{ width: "20%", background: "yellow", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                        <Typography sx={{ fontSize: '0.75vw', color: "text.disabled", background: "pink" }}>{chat.time}</Typography>
                                        {chat.isSent ? <ArrowUpwardOutlinedIcon sx={{ width: "15%", background: "white", color:"text.disabled" }} /> : <ArrowDownwardOutlinedIcon />}
                                        <OnlyIconButton Icon={ContentCopyOutlinedIcon} color={'text.disabled'} onHoverColor={'primary.main'} width='60%' onClick={onCopyToClipboard} />

                                    </Box>
                                </Box>
                            </Box>

                        ))
                    }
                </Stack>
            </Box>
            {/* <Box sx={{ height: "15%", background: "magenta", width: "100%", }}>
                Box 2
            </Box> */}
        </Box>
    )
}

export default Chat