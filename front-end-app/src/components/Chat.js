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


const Chat = ({ data, isHalfWidth, onLatencyInspect, isLatencyInspect, onMessageClick, sendMessage }) => {
    const theme = useTheme();
    const [copyMessageClickedData, setCopyMessageClickedData] = useState(false)
    const [isMssgJsonEditor, setIsMssgJsonEditor] = useState(false)
    const [mssgData, setMssgData] = useState('')
    const [schemas, setSchemas] = useState([{ name: "remote digital signature", id: "1122" }, { name: "remote digital signature", id: "1177" }, { name: "job lock", id: "11522377" }, { name: "digitization", id: "1135477" }, { name: "transaction", id: "1114577" }, { name: "masters", id: "117714" }, { name: "checklist", id: "1172457" }])

    const onCopyToClipboard = (message) => {
        setCopyMessageClickedData(message)
    }
    const handleMssgJsonEditor = () => {
        setIsMssgJsonEditor(true)
    }
    const fixJsonString = (str) => {
        // Add quotes around keys
        const fixedStr = str.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
        return fixedStr;
    };
    
    // Helper function to parse JSON safely
    const parseJsonSafely = (str) => {
        let parsed;
        const fixedStr = fixJsonString(str);
        try {
            parsed = JSON.parse(fixedStr);
        } catch {
            return { isValid: false, data: str };
        }
        return { isValid: true, data: parsed };
    };
    
    const handleSendMessage = () => {
        const msgData = [...data]
        const message = parseJsonSafely(mssgData)
        msgData.push(message.data)
        sendMessage(msgData)
        setIsMssgJsonEditor(false)
        setMssgData('')
    }
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%", height: "5%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer", marginRight:"3%" }} onClick={onLatencyInspect}>
                        <TimerOutlinedIcon sx={{ height: "80%" }} />
                        <Typography variant="body2" sx={{ marginLeft: "0.3vw", color: isLatencyInspect ? "primary.main" : "text.disabled", cursor: "pointer" }}>Inspect latency</Typography>
                    </Box>
            </Box>
            <Box sx={{ height: "72%", width: "100%", overflowY: "auto", overflowX: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: '1%',
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
                <Stack direction="column" spacing={5} sx={{ width: "97%", maxHeight: "70vh" }}>
                    {
                        data.map((chat) => (
                            <Box key={chat.id} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: chat.isSent && !isHalfWidth ? "flex-end" : isHalfWidth ? "center" : "flex-start", paddingBottom: chat.id === data[data.length - 1].id ? "1.5vh" : "0vh" }}>
                                <Box sx={{ width: isHalfWidth ? "95%" : "70%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.5vw", height: "6vh", minHeight: "30px", maxHeight: "75px", borderRadius: "8px", bgcolor: chat.isSent ? "success.chatBg" : "fail.chatBg" }}>

                                    <Typography onClick={() => onMessageClick(chat)} sx={{ width: isHalfWidth ? "80%" : "88%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", display: "block", color: "text.main", cursor: "pointer" }}>{typeof chat === 'object'? JSON.stringify(chat): chat}</Typography>

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
            <Box sx={{ marginTop: "2%", height: "20%", width: "97%", display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
                <Box sx={{ width: isHalfWidth ? "95%" : "100%", height: "90%", display: "flex", alignItems: "flex-start", justifyContent: "center", borderRadius: "12px", boxShadow: 2, flexDirection: "column"}}>
                    <Box sx={{ height: "32%", marginTop: "1%", marginBottom: "1%", width: "99%", display: "flex"}}>
                        <Box sx={{
                            height: "100%", display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-start", paddingLeft: "1%", overflow: 'hidden', overflowX: "scroll",
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}>
                            {
                                schemas.map(schema => (
                                    <BoxCardChild boxOutline={"primary.main"} bgColor={"primary.light"} key={schema.id} data={schema} dataKey={"name"} />
                                ))
                            }
                        </Box>
                        <Box width={{
                            xs: '35%',
                            sm: '30%',
                            md: '25%',
                            lg: '20%',
                            xl: '17.5%',
                        }} sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "1vw" }}>
                            <TextButton text={isMssgJsonEditor ? "Close Json Editor" : "Open JSON editor"} color={'text.disabled'} onHoverColor={'primary.main'} onClick={handleMssgJsonEditor} />
                        </Box>
                    </Box>
                    <Box sx={{ height: "66%", width: "100%", display: "flex",}}>
                        <Box sx={{ height: "100%", display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-start", paddingLeft: "1%", }}>
                            <textarea value={mssgData} onChange={(e)=>setMssgData(e.target.value)} style={{ height: "99%", width: "100%", outline: "none", border: "none", paddingTop: "0.5%", paddingBottom: "0.5%", overflow: "hidden", resize: "none" }} rows="4" cols="50">

                            </textarea>
                        </Box>
                        <Box width={{
                            xs: '35%',
                            sm: '30%',
                            md: '25%',
                            lg: '20%',
                            xl: '17.5%',
                        }} sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "1vw" }}>
                            <IconButton  buttonName={"Send"} Icon={() => <SendIcon />} buttonBackground={"primary.main"} iconColor={"primary.iconLight"} handleSubmit={handleSendMessage} width={{
                                xs: '100%',
                                sm: '100%',
                                md: '95%',
                                lg: '90%',
                                xl: '85%',
                            }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <SnackBarAlert text={"Copied to clipboard"} isOpen={Boolean(copyMessageClickedData)} setIsOpen={setCopyMessageClickedData} severity={"success"} />
        </Box>
    )
}

export default Chat