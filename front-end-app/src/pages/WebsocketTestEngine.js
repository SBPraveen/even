import React from 'react'
import Layout from './layout'
import { Box, Typography } from '@mui/material';
import { ReactComponent as WorkInProgress } from '../images/work_in_progress.svg'


const WebsocketTestEngine = () => {
    return (
        <Layout>
            <Box sx={{ bgcolor: 'primary.light', height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <WorkInProgress />
                <Typography variant="h6" sx={{color:"text.disabled", marginTop: "1vh" }}>
                Web Socket Test Engine - Work in progress. 
                </Typography>

            </Box>
        </Layout>
    )
}

export default WebsocketTestEngine