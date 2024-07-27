import { Box, Typography } from '@mui/material'
import { ReactComponent as ErrorImg } from '../images/error.svg'
import styles from '../styles/pages/Error'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
    return (
        <Box sx={styles.errorPageMain}>
            <ErrorImg />
            <Typography
                variant='h6'
                sx={{ color: 'text.backgroundMatch', marginTop: '1vh' }}
            >
                Sorry, an unexpected error has occurred.
            </Typography>
            <Typography
                variant='body2'
                sx={{ color: 'text.backgroundMatch', marginTop: '0.5vh' }}
            >
                {error.statusText || error.message}
            </Typography>
        </Box>
    )
}

export default Error
