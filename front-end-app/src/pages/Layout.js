import { Avatar, Box, Stack, Tooltip } from '@mui/material'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ReactComponent as Even } from '../icons/even_icon.svg'
import { ReactComponent as KafkaServer } from '../icons/kafka_server.svg'
import PropTypes from 'prop-types'
import { ReactComponent as SchemaRegistry } from '../icons/schema_registry.svg'
import { ReactComponent as WebsocketServer } from '../icons/websocket_server_icon.svg'
import { ReactComponent as WebsocketTestEngine } from '../icons/websocket_test_engine.svg'
import styles from '../styles/pages/Layout'

const Layout = ({ children }) => {
    const [url, setUrl] = useState('/consumer')
    useEffect(() => {
        window.ipcRenderer.getTitle().then((title) => {
            if (title === 'producer') {
                setUrl('/producer')
            } else if (title === 'consumer') {
                setUrl('/consumer')
            }
            // else {
            //     setUrl('/webSocketServer')
            // }
        })
    }, [])
    return (
        <Box sx={styles.layoutMain}>
            <Navigate to={url} />
            {url !== '/producer' && url !== '/consumer' && (
                <Box sx={styles.navBar}>
                    <Box sx={styles.icon}>
                        <Even width={'80%'} />
                    </Box>
                    <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        spacing={5}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Tooltip title={'Web Socket Server'} placement='right'>
                            <Link to={'webSocketServer'}>
                                <WebsocketServer
                                    width={'77.5%'}
                                    height={'77.5%'}
                                />
                            </Link>
                        </Tooltip>
                        <Tooltip
                            title={'Web Socket Test Engine'}
                            placement='right'
                        >
                            <Link to={'webSocketTestEngine'}>
                                <WebsocketTestEngine
                                    width={'77.5%'}
                                    height={'77.5%'}
                                />
                            </Link>
                        </Tooltip>
                        <Tooltip title={'Kafka Server'} placement='right'>
                            <Link to={'kafkaServer'}>
                                <KafkaServer width={'77.5%'} height={'77.5%'} />
                            </Link>
                        </Tooltip>
                        <Tooltip title={'Schema Registry'} placement='right'>
                            <Link to={'schemaRegistry'}>
                                <SchemaRegistry
                                    width={'77.5%'}
                                    height={'77.5%'}
                                />
                            </Link>
                        </Tooltip>
                    </Stack>
                    <Avatar sx={styles.avatar}>P</Avatar>
                </Box>
            )}
            <Box sx={styles.childrenComp}>{children ?? <Outlet />}</Box>
        </Box>
    )
}

Layout.propTypes = {
    children: PropTypes.element.isRequired,
}
export default Layout
