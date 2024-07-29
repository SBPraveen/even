/* eslint-disable max-lines-per-function */
import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import CloseIcon from '@mui/icons-material/Close'
import OnlyIconButton from '../components/buttons/OnlyIconButton'
import ReactJson from '@microlink/react-json-view'
import SettingsIcon from '@mui/icons-material/Settings'
import SnackBarAlert from '../components/SnackBarAlert'
import styles from '../styles/sub-pages/WebSocketServerStarted'
const Consumer = () => {
    const [jsonViewerData, setJsonViewerData] = useState(false)
    const [consumedMessages, setConsumedMessages] = useState([])
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        message: '',
        severity: '',
    })
    useEffect(() => {
        window.ipcRenderer.kafkaConsumerStarter()
    }, [])
    const onMessageClick = (message) => {
        if (typeof message.msg === 'object') {
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
    const snackBarToggle = (isOpen) => {
        setSnackbar({
            isOpen,
            message: snackbar.message,
            severity: snackbar.severity,
        })
    }
    return (
        <Box sx={styles.main}>
            <Box sx={styles.bottom}>
                <Box sx={styles.chatSection(jsonViewerData)}>
                    <Box sx={styles.chatBody}>
                        <Chat
                            data={consumedMessages}
                            setChatData={setConsumedMessages}
                            isHalfWidth={jsonViewerData}
                            onLatencyInspect={false}
                            isLatencyInspect={false}
                            onMessageClick={onMessageClick}
                            noOfSelectedMessages={[]}
                            isConsumer={true}
                            schemas={[]}
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
        </Box>
    )
}

export default Consumer
