import React, { useState } from 'react'
import { Box } from '@mui/material';
import Tabs from '../components/Tabs'
import WebSocketInitPage from '../subPages/WebSocketServerInitPage';
import WebSocketServerStarted from '../subPages/WebSocketServerStarted';


const CreateWebsocketServer = () => {
  const [tabsData, setTabsData] = useState([{ text: "ws://localhost:8080", icon: "ws_connection", id: 1234 }, { text: "ws://localhost:9090", icon: "ws_server", id: 456 }, { text: "ws://localhost:7070", icon: "ws_connection", id: 789 }])
  const [isServerStarted, setIsServerStarted] = useState(false)
  const [port, setPort] = useState()
  const [url, setUrl] = useState()

  const onCreateNewTab = () => {
    const tempTabsData = JSON.parse(JSON.stringify(tabsData))
    const newTabData = { text: "ws://localhost:8089", icon: "ws_connection", id: Date.now() }
    setTabsData([...tempTabsData, newTabData])
  }
  const onTabClose = (closedTab) => {
    const tempTabsData = tabsData.filter((tab) => tab.id !== closedTab.id)
    setTabsData(tempTabsData)
  }

  return (
    <Box sx={{ bgcolor: 'primary.light', height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", width: "100%" }}>
      <Tabs tabsData={tabsData} onCreateNewTab={onCreateNewTab} onTabClose={onTabClose} />
      {
        isServerStarted ?
          <Box sx={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <WebSocketServerStarted port={port} url={url} setIsServerStarted={setIsServerStarted} />
          </Box>
          :
          <Box sx={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <WebSocketInitPage setIsServerStarted={setIsServerStarted} setPort={setPort} setUrl={setUrl} />
          </Box>
      }

    </Box>
  )
}

export default CreateWebsocketServer