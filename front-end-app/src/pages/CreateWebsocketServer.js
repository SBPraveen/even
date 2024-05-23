import React, { useState } from 'react'
import Layout from './layout'
import { Box } from '@mui/material';
import Tabs from '../components/Tabs'


const CreateWebsocketServer = () => {
  const [tabsData, setTabsData] = useState([{text:"ws://localhost:8080", icon:"ws_connection", id:1234}, {text:"ws://localhost:9090", icon:"ws_server", id:456}, {text:"ws://localhost:7070", icon:"ws_connection", id:789}])

  const onCreateNewTab = () => {
    const tempTabsData = JSON.parse(JSON.stringify(tabsData))
    const newTabData = {text:"", icon:"ws_connection", id:Date.now()}
    setTabsData([...tempTabsData, newTabData])
  }  
  const onTabClose = () => {

  }

  return (
    <Layout>
      <Box sx={{bgcolor:'primary.light', height: "100vh", display:"flex", alignItems:"center", justifyContent:"flex-start", flexDirection:"column"}}>
        <Tabs tabsData={tabsData} onCreateNewTab={onCreateNewTab} onTabClose={onTabClose} />
          <Box sx={{flex:1, width:"100%"}}>
            Praveen
          </Box>
      </Box>
    </Layout>
  )
}

export default CreateWebsocketServer