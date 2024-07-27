import { Box, Typography } from '@mui/material'
import { ReactComponent as WorkInProgress } from '../images/work_in_progress.svg'
import styles from '../styles/pages/KafkaServer'

const KafkaServer = () => {
    return (
        <Box sx={styles.kafkaServerMain}>
            <WorkInProgress />
            <Typography
                variant='h6'
                sx={{ color: 'text.disabled', marginTop: '1vh' }}
            >
                Kafka Server - Work in progress.
            </Typography>
        </Box>
    )
}

export default KafkaServer
