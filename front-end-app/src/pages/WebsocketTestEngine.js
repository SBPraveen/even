import { Box, Typography } from '@mui/material'
import { ReactComponent as WorkInProgress } from '../images/work_in_progress.svg'
import styles from '../styles/pages/WebsocketTestEngine'

const WebsocketTestEngine = () => {
    return (
        <Box sx={styles.main}>
            <WorkInProgress />
            <Typography variant='h6' sx={styles.text}>
                Web Socket Test Engine - Work in progress.
            </Typography>
        </Box>
    )
}

export default WebsocketTestEngine
