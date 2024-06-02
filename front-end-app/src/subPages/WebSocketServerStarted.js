import { Box, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import FlightLandIcon from '@mui/icons-material/FlightLand';
import IconButton from '../components/buttons/IconButton';
import CopyBox from '../components/CopyBox';
import Chat from '../components/Chat';

const WebSocketServerStarted = () => {
  const [isServerStopLoading, setIsServerStopLoading] = useState(false)
  const [isJsonViewerVisible, setIsJsonViewerVisible] = useState(true)
  const [isLatencyInspect, setIsLatencyInspect] = useState(false)
  const [messages, setMessages] = useState([{ message: JSON.stringify({ name: "praveen", gender: "male", area: "Virugambakkam", company: { name: "unifo", area: "shollinganallur", isStartup: true, noOfEmployees: 100 }, favouriteFood: "sweet pongal" }), id: "111", isSent: true, time: "08:10:55 PM", timeStamp: 1717328866430 }, { message: JSON.stringify({ name: "praveen", gender: "male", area: "Virugambakkam", company: { name: "unifo", area: "shollinganallur", isStartup: true, noOfEmployees: 100 }, favouriteFood: "sweet pongal" }), id: "111", isSent: false, time: "08:10:55 PM", timeStamp: 1717328866430 }])

  const handleStopWssServer = () => {
    setIsServerStopLoading(true)
  }
  const onLatencyInspect = () => {
    setIsLatencyInspect(!isLatencyInspect)
  }

  return (
    <Box sx={{ width: "100%", height: "100%", background: "pink", padding: "0 1vw", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <Box sx={{ width: (isJsonViewerVisible ? "60%" : "100%"), background: "blue", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>
        <Box sx={{ width: "100%", height: "7%", background: "blue", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "blue", width: "100%", height: "100%", }}>
            <Box sx={{ display: "flex", alignItems: "center", background: "yellow", }}>
              <Typography sx={{ marginRight: "1.5vw" }}>Web-socket server started at</Typography>
              <CopyBox text={"ws://localhost:3000"} />
            </Box>

            <IconButton buttonName={"Stop"} Icon={() => <FlightLandIcon />} buttonBackground={"fail.main"} iconColor={"fail.light"} handleSubmit={handleStopWssServer} isLoading={isServerStopLoading} />
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "calc(93% - 2vh)", bgcolor: 'primary.white', borderRadius: "21px" }}>
          <Chat data={messages} isHalfWidth={isJsonViewerVisible} onLatencyInspect={onLatencyInspect} isLatencyInspect={isLatencyInspect}/>
        </Box>
      </Box>

      {
        isJsonViewerVisible && <Box sx={{ width: "40%", background: "yellow", height: "100%" }}>
          box2
        </Box>
      }

    </Box>
  )
}

export default WebSocketServerStarted
