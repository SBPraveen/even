import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlightLandIcon from '@mui/icons-material/FlightLand';
import IconButton from '../components/buttons/IconButton';
import CopyBox from '../components/CopyBox';
import Chat from '../components/Chat';
import ReactJson from '@microlink/react-json-view'
import '../styles/jsonViewer.css'
import OnlyIconButton from '../components/buttons/OnlyIconButton';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import SnackBarAlert from '../components/SnackBarAlert';
import { timeStampFormater } from '../utils';

const WebSocketServerStarted = () => {
  const [isServerStopLoading, setIsServerStopLoading] = useState(false)
  const [jsonViewerData, setJsonViewerData] = useState(false)
  const [isLatencyInspect, setIsLatencyInspect] = useState(false)
  const [chatData, setChatData] = useState([])
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    severity: '',
  })
  const [persistSnackbar, setPersistSnackbar] = useState({
    isOpen: false,
    message: '',
    severity: '',
  })
  const [noOfSelectedMessages, setNoOfSelectedMessages] = useState([])
  useEffect(() => {
    if (noOfSelectedMessages.length === 2) {
      const diffTime = timeStampFormater(Math.abs(Number(noOfSelectedMessages[0].timeStamp) - Number(noOfSelectedMessages[1].timeStamp)), false);
      setPersistSnackbar({
        isOpen: true,
        message: `The latency between selected messages is ${diffTime}`,
        severity: 'info',
      })
    }
    else if (isLatencyInspect) {
      setPersistSnackbar({
        isOpen: true,
        message: 'Select 2 Messages to show latency',
        severity: 'info'
      })
    }
  }, [noOfSelectedMessages, isLatencyInspect])

  const setSnackbar2Open = (isOpen) => {
    setPersistSnackbar({
      isOpen,
      message: persistSnackbar.message,
      severity: persistSnackbar.severity,
    })
  }
  const setSnackbarOpen = (isOpen) => {
    setSnackbar({
      isOpen,
      message: snackbar.message,
      severity: snackbar.severity,
    })
  }
  const handleStopWssServer = () => {
    setIsServerStopLoading(true)
  }
  const onLatencyInspect = () => {
    if (isLatencyInspect) {
      setNoOfSelectedMessages([])
      setPersistSnackbar({
        isOpen: false,
        message: persistSnackbar.message,
        severity: persistSnackbar.severity,
      })
    }
    setIsLatencyInspect(!isLatencyInspect)
  }
  const onMessageClick = (message) => {
    if (isLatencyInspect) {
      const selectedMessages = JSON.parse(JSON.stringify(noOfSelectedMessages))
      const messageIndex = selectedMessages.findIndex(item => item.msgId === message.msgId)
      if (messageIndex > -1){ 
        selectedMessages.splice(messageIndex, 1);
        setNoOfSelectedMessages(selectedMessages)
      }
      else if (selectedMessages.length < 2) {
        selectedMessages.push(message)
        setNoOfSelectedMessages(selectedMessages)
      }
      else if (selectedMessages.length === 2) {
        setSnackbar({
          isOpen: true,
          message: 'Only 2 messages can be selected',
          severity: 'error',
        })
      }
    }
    else if (typeof message.msg === 'object') {
      if (jsonViewerData === message.msg) setJsonViewerData(false)
      else setJsonViewerData(message.msg)
    } else {
      setSnackbar({
        isOpen: true,
        message: 'The message cannot be opened in JSON Viewer',
        severity: 'warning',
      })
    }
  }

  const handleJsonViewerClose = () => {
    setJsonViewerData(false)
  }

  const handleJsonSettings = () => {
    console.log("handleJsonSettings");
  }

  return (
    <Box sx={{ width: "100%", height: "100%", padding: "0 1vw", display: "flex", alignItems: "flex-start", justifyContent: "center", flexDirection: "column" }}>
      <Box sx={{ width: "100%", height: "7%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: "100%", }}>
          <Box sx={{ display: "flex", alignItems: "center", }}>
            <Typography sx={{ marginRight: "1.5vw" }}>Web-socket server started at</Typography>
            <CopyBox text={"ws://localhost:3000"} />
          </Box>

          <IconButton buttonName={"Stop"} Icon={() => <FlightLandIcon />} buttonBackground={"fail.main"} iconColor={"fail.light"} handleSubmit={handleStopWssServer} isLoading={isServerStopLoading} />
        </Box>

      </Box>
      <Box sx={{ height: "93%", display: "flex", width: "100%" }}>
        <Box sx={{ width: (jsonViewerData ? "60%" : "100%"), height: "98%", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>

          <Box sx={{ width: "100%", height: "100%", bgcolor: 'primary.white', borderRadius: "21px" }}>
            <Chat data={chatData} isHalfWidth={jsonViewerData} onLatencyInspect={onLatencyInspect} isLatencyInspect={isLatencyInspect} onMessageClick={onMessageClick} setChatData={setChatData} noOfSelectedMessages={noOfSelectedMessages} />

          </Box>
        </Box>
        {
          jsonViewerData && <Box className="custom-scrollbar" sx={{ width: "40%", height: "98%", paddingLeft: "1vw", position: "relative" }}>
            <Box sx={{ position: "absolute", top: "1vh", right: "1vw", width: "10vw", zIndex: "100", height: "4vh" }}>
              <Stack direction="row-reverse" spacing={2} sx={{ width: "97%", height: "100%" }}>
                <OnlyIconButton Icon={CloseIcon} color={'text.disabled'} onHoverColor={'primary.main'} width='100%' onClick={handleJsonViewerClose} />
                <OnlyIconButton Icon={SettingsIcon} color={'text.disabled'} onHoverColor={'primary.main'} width='100%' onClick={handleJsonSettings} />
              </Stack>
            </Box>
            <ReactJson src={jsonViewerData} enableClipboard={false} theme="solarized" style={{ borderRadius: "21px", borderTopLeftRadius: "16px", width: "100%", height: "100%", maxHeight: "90vh", overflow: "scroll" }} />
          </Box>
        }

      </Box>
      <SnackBarAlert text={snackbar.message} isOpen={snackbar.isOpen} setIsOpen={setSnackbarOpen} severity={snackbar.severity} />
      <SnackBarAlert text={persistSnackbar.message} isOpen={persistSnackbar.isOpen} setIsOpen={setSnackbar2Open} severity={persistSnackbar.severity} persist={true} />
    </Box>
  )
}

export default WebSocketServerStarted
