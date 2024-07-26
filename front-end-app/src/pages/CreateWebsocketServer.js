import { Box } from '@mui/material'
import Tabs from '../components/Tabs'
import WebSocketInitPage from '../sub-pages/WebSocketServerInitPage'
import WebSocketServerStarted from '../sub-pages/WebSocketServerStarted'
import { ReactComponent as WsConnection } from '../icons/ws_connection.svg'
import { ReactComponent as WsServer } from '../icons/ws_server.svg'
import styles from '../styles/pages/CreateWebsocketServer'
import { useState } from 'react'

const CreateWebsocketServer = () => {
    const [tabsData, setTabsData] = useState([])
    const [isServerStarted, setIsServerStarted] = useState(false)
    const [port, setPort] = useState()
    const [url, setUrl] = useState()

    const onCreateNewTab = () => {
        const newTabData = {
            icon:
                Math.floor(Math.random() * 10) % 2 === 0 ? (
                    <WsConnection />
                ) : (
                    <WsServer />
                ),
            tabId: Date.now(),
            text: 'ws://localhost:8089',
        }
        setTabsData([...tabsData, newTabData])
    }

    const onTabClose = (closedTab) => {
        const tempTabsData = tabsData.filter(
            (tab) => tab.tabId !== closedTab.tabId,
        )
        setTabsData(tempTabsData)
    }

    return (
        <Box sx={styles.createWebsocketServerMain}>
            <Tabs
                tabsData={tabsData}
                onCreateNewTab={onCreateNewTab}
                onTabClose={onTabClose}
            />
            {isServerStarted ? (
                <Box sx={styles.webSocketServerStarted}>
                    <WebSocketServerStarted
                        port={port}
                        url={url}
                        setIsServerStarted={setIsServerStarted}
                    />
                </Box>
            ) : (
                <Box sx={styles.webSocketInitPage}>
                    <WebSocketInitPage
                        setIsServerStarted={setIsServerStarted}
                        setPort={setPort}
                        setUrl={setUrl}
                    />
                </Box>
            )}
        </Box>
    )
}

export default CreateWebsocketServer
