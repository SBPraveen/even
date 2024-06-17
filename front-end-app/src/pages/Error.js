import React from 'react'
import Layout from './layout'
import { Box, Typography } from '@mui/material';
import { ReactComponent as ErrorImg } from '../images/error.svg'
import { useRouteError } from "react-router-dom";



const Error = () => {  
    const error = useRouteError();
  console.error(error); 
    return (
        <Layout>
            <Box sx={{ bgcolor: 'primary.light', height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <ErrorImg />
                <Typography variant="h6" sx={{color:"text.disabled", marginTop: "1vh" }}>
                Sorry, an unexpected error has occurred.
                </Typography>
                <Typography variant="body2" sx={{color:"text.disabled", marginTop: "0.5vh" }}>
                {error.statusText || error.message}
                </Typography>

            </Box>
        </Layout>
    )
}

export default Error