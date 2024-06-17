import React from 'react'
import { Box, Stack, Avatar, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ReactComponent as Even } from '../icons/even_icon.svg'
import { ReactComponent as KafkaServer } from '../icons/kafka_server.svg'
import { ReactComponent as SchemaRegistry } from '../icons/schema_registry.svg'
import { ReactComponent as WebsocketServer } from '../icons/websocket_server_icon.svg'
import { ReactComponent as WebsocketTestEngine } from '../icons/websocket_test_engine.svg'
const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', width: "100vw", height: "100vh" }}>
            <Box sx={{ height: '100%', width: '57.5px', bgcolor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative' }}>
                <Box sx={{ marginTop: '1vh', marginBottom: '4vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Even width={"80%"} />
                </Box>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}
                    sx={{ cursor: "pointer" }}
                >
                    <Tooltip title={"Web Socket Server"} placement="right">
                        <Link to={`webSocketServer`}>
                            <WebsocketServer width={"77.5%"} height={"77.5%"} />
                        </Link>
                    </Tooltip>
                    <Tooltip title={"Web Socket Test Engine"} placement="right">
                        <Link to={`webSocketTestEngine`}>
                            <WebsocketTestEngine width={"77.5%"} height={"77.5%"} />
                        </Link>
                    </Tooltip>
                    <Tooltip title={"Kafka Server"} placement="right">
                        <Link to={`kafkaServer`}>
                            <KafkaServer width={"77.5%"} height={"77.5%"} />
                        </Link>
                    </Tooltip>
                    <Tooltip title={"Schema Registry"} placement="right">
                        <Link to={`schemaRegistry`}>
                            <SchemaRegistry width={"77.5%"} height={"77.5%"} />
                        </Link>
                    </Tooltip>

                </Stack>
                <Avatar sx={{ bgcolor: 'primary.main', position: 'absolute', bottom: '0', marginBottom: '1vh', width: "50" }}>P</Avatar>
            </Box>
            <Box sx={{ height: '100vh', width: 'calc(100vw - 57.5px)', bgcolor: "primary.light" }}>
                {children ?? <Outlet />}
            </Box>

        </Box>
    )
}

export default Layout
