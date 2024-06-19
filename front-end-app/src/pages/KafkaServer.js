import React from 'react'
import { Box, Typography } from '@mui/material';
import { ReactComponent as WorkInProgress } from '../images/work_in_progress.svg'


const KafkaServer = () => {
    return (
            <Box sx={{ bgcolor: 'primary.light', height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <WorkInProgress />
                <Typography variant="h6" sx={{color:"text.disabled", marginTop: "1vh" }}>
                Kafka Server - Work in progress. 
                </Typography>

            </Box>
    )
}

export default KafkaServer