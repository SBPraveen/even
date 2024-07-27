/* eslint-disable react/prop-types */
/* eslint-disable max-lines-per-function */
import '../styles/jsonViewer.css'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import CloseIcon from '@mui/icons-material/Close'
import CopyBox from '../components/CopyBox'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import IconButton from '../components/buttons/IconButton'
import OnlyIconButton from '../components/buttons/OnlyIconButton'
import ReactJson from '@microlink/react-json-view'
import SettingsIcon from '@mui/icons-material/Settings'
import SnackBarAlert from '../components/SnackBarAlert'
import styles from '../styles/sub-pages/WebSocketServerStarted'
import { timeStampFormatter } from '../utils'

const WebSocketServerStarted = ({ port, url, setIsServerStarted, schemas }) => {
    const [isServerStopLoading, setIsServerStopLoading] = useState(false)
    const [jsonViewerData, setJsonViewerData] = useState(false)
    const [isLatencyInspect, setIsLatencyInspect] = useState(false)
    const [chatData, setChatData] = useState([])
    const [noOfSelectedMessages, setNoOfSelectedMessages] = useState([])
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        message: '',
        severity: '',
    })
    const [latencySnackbar, setLatencySnackbar] = useState({
        isOpen: false,
        message: '',
        severity: '',
    })

    useEffect(() => {
        if (noOfSelectedMessages.length === 2) {
            const diffTime = timeStampFormatter(
                Math.abs(
                    Number(noOfSelectedMessages[0].timeStamp) -
                        Number(noOfSelectedMessages[1].timeStamp),
                ),
                false,
            )
            setLatencySnackbar({
                isOpen: true,
                message: `The latency between selected messages is ${diffTime}`,
                severity: 'info',
            })
        } else if (isLatencyInspect) {
            setLatencySnackbar({
                isOpen: true,
                message: 'Select 2 Messages to show latency',
                severity: 'info',
            })
        }
    }, [noOfSelectedMessages, isLatencyInspect])

    const latencySnackBarToggle = (isOpen) => {
        setLatencySnackbar({
            isOpen,
            message: latencySnackbar.message,
            severity: latencySnackbar.severity,
        })
    }
    const snackBarToggle = (isOpen) => {
        setSnackbar({
            isOpen,
            message: snackbar.message,
            severity: snackbar.severity,
        })
    }
    const handleStopWssServer = () => {
        setIsServerStopLoading(true)
        window.ipcRenderer.stopServer()
        setIsServerStopLoading(false)
        setIsServerStarted(false)
    }
    const onLatencyInspect = () => {
        if (isLatencyInspect) {
            setNoOfSelectedMessages([])
            setLatencySnackbar({
                isOpen: false,
                message: latencySnackbar.message,
                severity: latencySnackbar.severity,
            })
        }
        setIsLatencyInspect(!isLatencyInspect)
    }
    const onMessageClick = (message) => {
        if (isLatencyInspect) {
            const selectedMessages = JSON.parse(
                JSON.stringify(noOfSelectedMessages),
            )
            const messageIndex = selectedMessages.findIndex(
                (item) => item.msgId === message.msgId,
            )
            if (messageIndex > -1) {
                selectedMessages.splice(messageIndex, 1)
                setNoOfSelectedMessages(selectedMessages)
            } else if (selectedMessages.length < 2) {
                selectedMessages.push(message)
                setNoOfSelectedMessages(selectedMessages)
            } else if (selectedMessages.length === 2) {
                setSnackbar({
                    isOpen: true,
                    message: 'Only 2 messages can be selected',
                    severity: 'error',
                })
            }
        } else if (typeof message.msg === 'object') {
            if (jsonViewerData === message.msg) {
                setJsonViewerData(false)
            } else {
                setJsonViewerData(message.msg)
            }
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
        console.log('handleJsonSettings')
    }

    return (
        <Box sx={styles.main}>
            <Box sx={styles.top}>
                <Box sx={styles.topLeft}>
                    <Box sx={styles.startedAddress}>
                        <Typography sx={{ marginRight: '1.5vw' }}>
                            Web-socket server started at
                        </Typography>
                        <CopyBox text={url ?? `ws://localhost:${port}`} />
                    </Box>
                    <IconButton
                        buttonName={'Stop'}
                        Icon={() => <FlightLandIcon />}
                        buttonBackground={'fail.main'}
                        iconColor={'fail.light'}
                        handleSubmit={handleStopWssServer}
                        isLoading={isServerStopLoading}
                    />
                </Box>
            </Box>
            <Box sx={styles.bottom}>
                <Box sx={styles.chatSection(jsonViewerData)}>
                    <Box sx={styles.chatBody}>
                        <Chat
                            data={chatData}
                            isHalfWidth={jsonViewerData}
                            onLatencyInspect={onLatencyInspect}
                            isLatencyInspect={isLatencyInspect}
                            onMessageClick={onMessageClick}
                            setChatData={setChatData}
                            noOfSelectedMessages={noOfSelectedMessages}
                            schemas={schemas}
                        />
                    </Box>
                </Box>
                {jsonViewerData && (
                    <Box
                        className='custom-scrollbar'
                        sx={styles.jsonViewerSection}
                    >
                        <Box sx={styles.jsonViewerIcon}>
                            <Stack
                                direction='row-reverse'
                                spacing={2}
                                sx={styles.iconStack}
                            >
                                <OnlyIconButton
                                    Icon={CloseIcon}
                                    color={'text.disabled'}
                                    onHoverColor={'primary.main'}
                                    width='100%'
                                    onClick={handleJsonViewerClose}
                                />
                                <OnlyIconButton
                                    Icon={SettingsIcon}
                                    color={'text.disabled'}
                                    onHoverColor={'primary.main'}
                                    width='100%'
                                    onClick={handleJsonSettings}
                                />
                            </Stack>
                        </Box>
                        <ReactJson
                            src={jsonViewerData}
                            enableClipboard={false}
                            theme='solarized'
                            style={styles.reactJson}
                        />
                    </Box>
                )}
            </Box>
            <SnackBarAlert
                text={snackbar.message}
                isOpen={snackbar.isOpen}
                closeSnackBar={() => snackBarToggle(false)}
                severity={snackbar.severity}
            />
            <SnackBarAlert
                text={latencySnackbar.message}
                isOpen={latencySnackbar.isOpen}
                closeSnackBar={() => latencySnackBarToggle(false)}
                severity={latencySnackbar.severity}
                persist={true}
            />
        </Box>
    )
}

export default WebSocketServerStarted
