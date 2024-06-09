import { Box, Stack, Typography, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import OnlyIconButton from './buttons/OnlyIconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SnackBarAlert from './SnackBarAlert';
import TextButton from './buttons/TextButton'
import IconButton from './buttons/IconButton'
import SendIcon from '@mui/icons-material/Send';
import CustomTextField from './textFields/CustomTextField';
import BoxCardChild from './BoxCardChild';
import { useTheme } from '@mui/material/styles';


const Chat = ({ data, isHalfWidth, onLatencyInspect, isLatencyInspect, onMessageClick }) => {
    const theme = useTheme();
    const [copyMessageClickedData, setCopyMessageClickedData] = useState(false)
    const [isMssgJsonEditor, setIsMssgJsonEditor] = useState(false)
    const [mssgData, setMssgData] = useState('')
    const [schemas, setSchemas] = useState([{name:"remote digital signature", id:"1122"}, {name:"remote digital signature", id:"1177"}, {name:"job lock", id:"11522377"}, {name:"digitization", id:"1135477"}, {name:"transaction", id:"1114577"}, {name:"masters", id:"117714"}, {name:"checklist", id:"1172457"}])
    
    const onCopyToClipboard = (message) => {
        setCopyMessageClickedData(message)
    }
    const handleMssgJsonEditor = () => {
        setIsMssgJsonEditor(true)
    }
    const handleSendMessage = () => {
        const message = ""
        setIsMssgJsonEditor(false)
        setMssgData('')
    }
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%", height: "5%" }}>
                <Stack direction="row" spacing={5} sx={{ marginRight: "1vw" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer" }} onClick={onLatencyInspect}>
                        <TimerOutlinedIcon sx={{ height: "80%" }} />
                        <Typography variant="body2" sx={{ marginLeft: "0.3vw", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer" }}>Inspect latency</Typography>
                    </Box>

                </Stack>
            </Box>
            <Box sx={{
                height: "72%", width: "100%", overflowY: "auto", overflowX: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: '1%',
                // Scrollbar styles for Webkit-based browsers (Chrome, Safari)
                '&::-webkit-scrollbar': {
                    width: '8px',

                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: "transparent",
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'primary.iconLight',
                    borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'primary.main',
                },
                // Scrollbar styles for Firefox
                '*': {
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'primary.iconLight',
                },
            }}>
                <Stack direction="column" spacing={5} sx={{ width: isHalfWidth ? "55vw" : "90vw", maxHeight: "70vh" }}>
                    {
                        data.map((chat) => (
                            <Box key={chat.id} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: chat.isSent && !isHalfWidth ? "flex-end" : isHalfWidth ? "center" : "flex-start", paddingBottom: chat.id === data[data.length - 1].id ? "1.5vh" : "0vh" }}>
                                <Box sx={{ width: isHalfWidth ? "95%" : "70%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.5vw", height: "6vh", minHeight: "30px", maxHeight: "75px", borderRadius: "8px", bgcolor:chat.isSent? "success.chatBg" : "fail.chatBg" }}>

                                    <Typography onClick={() => onMessageClick(chat)} sx={{ width: isHalfWidth ? "80%" : "88%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", display: "block", color: "text.main", cursor: "pointer" }}>{chat.message}</Typography>

                                    <Box sx={{ width: isHalfWidth ? { xs: '40%', sm: '35%', md: '22%', lg: '17%', xl: '15%' } : { xs: '20%', sm: '20%', md: '20%', lg: '15%', xl: '11%' }, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Typography sx={{ fontSize: { xs: '0.4rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem', }, color: "text.disabled", margin: 0, paddingTop: "3px" }}>{chat.time}</Typography>
                                        {chat.isSent ? <ArrowUpwardOutlinedIcon sx={{ width: { xs: '17%', sm: '14%', md: '13%', lg: '12%', xl: '12%' }, color: "produce.main" }} /> : <ArrowDownwardOutlinedIcon sx={{ width: { xs: '17%', sm: '14%', md: '13%', lg: '12%', xl: '12%' }, color: "consume.main" }} />}
                                        <OnlyIconButton data={chat} Icon={ContentCopyOutlinedIcon} color={'text.disabled'} onHoverColor={'primary.main'} width='60%' onClick={onCopyToClipboard} />

                                    </Box>
                                </Box>
                            </Box>

                        ))
                    }
                </Stack>
            </Box>
            <Box sx={{ marginTop: "2%", height: "20%", width: isHalfWidth ? "55vw" : "90vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ width: isHalfWidth ? "95%" : "100%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", boxShadow: 2, position: "relative", flexDirection: "column" }}>
                    <Box sx={{ height: "32%", marginTop:"2%", marginBottom:"1%", width: "100%", display: "flex"}}>
                        <Box sx={{
                            height: "100%", display:"flex", alignItems:"center",justifyContent:"flex-start", paddingLeft:"1vw", overflow: 'hidden', overflowX:"scroll",
                            '&::-webkit-scrollbar': {
                                display: 'none', 
                              },
                              width: {
                                xs: '60%',
                                sm: '60%',
                                md: '75%',
                                lg: '75%',
                                xl: '85%',
                            }
                        }}>
                            {
                                schemas.map( schema => (
                                    <BoxCardChild boxOutline={"primary.main"} bgColor={"primary.light"} key={schema.id} data={schema} dataKey={"name"}/>
                                ))
                            }
                        </Box>
                        <Box sx={{
                            height: "100%", width: {
                                xs: '40%',
                                sm: '40%',
                                md: '25%',
                                lg: '25%',
                                xl: '15%',
                            }, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "1vw"
                        }}>
                            <TextButton text={isMssgJsonEditor ? "Close Json Editor" : "Open JSON editor"} color={'text.disabled'} onHoverColor={'primary.main'} onClick={handleMssgJsonEditor} />
                        </Box>
                    </Box>
                    <Box sx={{ height: "65%", width: "100%" }}>
                        <CustomTextField sx={{ height: "100%", maxHeight: "15vh", boxShadow: 'none', }} placeholder={"Message"} size={'large'} multiline={true} rows={3} />
                    </Box>
                    <IconButton sx={{ position: "absolute", bottom: "1.5vh", right: "1vw" }} buttonName={"Send"} Icon={() => <SendIcon />} buttonBackground={"primary.main"} iconColor={"primary.iconLight"} handleSubmit={handleSendMessage} width={{
                        xs: '20%',
                        sm: '20%',
                        md: '20%',
                        lg: '17.5%',
                        xl: '15%',
                    }} />
                </Box>

            </Box>
            <SnackBarAlert text={"Copied to clipboard"} isOpen={Boolean(copyMessageClickedData)} setIsOpen={setCopyMessageClickedData} severity={"success"} />
        </Box>
    )
}

export default Chat