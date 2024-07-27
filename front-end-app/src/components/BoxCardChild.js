import { Box, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import OnlyIconButton from './buttons/OnlyIconButton'
import PropTypes from 'prop-types'
import styles from '../styles/components/BoxCardChild'
import { useTheme } from '@mui/material/styles'

const BoxCardChild = ({ boxOutline, data, dataKey, onClose, onCardClick }) => {
    const theme = useTheme()
    return (
        <Box sx={styles.main(theme, onClose, boxOutline)}>
            <Tooltip title={data[dataKey]} placement='bottom'>
                <Box sx={styles.textSection} onClick={() => onCardClick(data)}>
                    <Typography sx={styles.text} variant='body2'>
                        {data[dataKey]}
                    </Typography>
                </Box>
            </Tooltip>
            {Boolean(onClose) && (
                <OnlyIconButton
                    sx={{ position: 'absolute', right: '5px' }}
                    Icon={CloseIcon}
                    color={'fail.light'}
                    data={data}
                    onHoverColor={'fail.main'}
                    width='60%'
                    onClick={onClose}
                />
            )}
        </Box>
    )
}

BoxCardChild.propTypes = {
    boxOutline: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataKey: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default BoxCardChild
