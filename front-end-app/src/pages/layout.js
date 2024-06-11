import React from 'react'
import { Box, Stack, Avatar, Tooltip} from '@mui/material';
import { ReactComponent as Even } from '../icons/even_icon.svg'
import { ReactComponent as KafkaServer } from '../icons/kafka_server.svg'
import { ReactComponent as KafkaTestEngine } from '../icons/kafka_test_engine.svg'
import { ReactComponent as WebsocketServer } from '../icons/websocket_server_icon.svg'
import { ReactComponent as WebsocketTestEngine } from '../icons/websocket_test_engine.svg'
const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ height: '100vh', width: '57.5px', bgcolor: 'secondary.main', display:'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection:'column', position:'relative'  }}>
                <Box sx={{marginTop:'1vh', marginBottom: '4vh', width:'100%', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Even  width={"80%"} />
                </Box>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={5}
                    sx={{cursor:"pointer"}}
                    >
                        <Tooltip title={"Web Socket Server"} placement="right">
                        <WebsocketServer width={"50%"} height={"50%"}/>
                        </Tooltip>
                        <Tooltip title={"Web Socket Test Engine"} placement="right">
                        <WebsocketTestEngine width={"50%"} height={"50%"} />
                        </Tooltip>
                        <Tooltip title={"Kafka Server"} placement="right">
                        <KafkaServer width={"50%"} height={"50%"} />
                        </Tooltip>
                        <Tooltip title={"Kafka Test Engine"} placement="right">
                        <KafkaTestEngine width={"50%"} height={"50%"} />
                        </Tooltip>
                    
                </Stack>
                <Avatar sx={{ bgcolor: 'primary.main', position:'absolute', bottom:'0', marginBottom: '1vh', width: "50" }}>P</Avatar>
            </Box>
            <Box sx={{ height: '100vh', width: 'calc(100vw - 57.5px)', background:"red"}}>
                {children}
            </Box>

        </Box>
    )
}

export default Layout
